import request from 'supertest';
import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';

// Import middleware
import errorHandler from '../src/middleware/errorHandler';

// Create test app
const app = express();
app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Import routes
import cardRoutes from '../src/routes/cards.routes';
import userRoutes from '../src/routes/users.routes';
app.use('/api/cards', cardRoutes);
app.use('/api/users', userRoutes);

// Error handler (must be last)
app.use(errorHandler);

let mongoServer: MongoMemoryServer;
let authToken: string;
let userId: string;

describe('Cards API', () => {
  beforeAll(async () => {
    // Set environment variables for tests
    process.env.JWT_SECRET = 'test_jwt_secret_key_for_testing_only_32_chars';
    process.env.NODE_ENV = 'test';
    
    mongoServer = await MongoMemoryServer.create();
    const mongoUri = mongoServer.getUri();
    await mongoose.connect(mongoUri);
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
  });

  beforeEach(async () => {
    if (mongoose.connection.db) {
      await mongoose.connection.db.dropDatabase();
    }
    
    // Create a business user for testing
    const userData = {
      name: { first: 'Business', last: 'User' },
      email: 'business@example.com',
      password: 'Test@1234',
      phone: '0501234567',
      address: {
        country: 'Israel',
        city: 'Tel Aviv',
        street: 'Test St',
        houseNumber: 1
      },
      isBusiness: true
    };

    const userResponse = await request(app)
      .post('/api/users')
      .send(userData);

    authToken = userResponse.body.token;
    userId = userResponse.body.user._id;
  });

  describe('GET /api/cards', () => {
    it('should return an array of cards', async () => {
      const response = await request(app)
        .get('/api/cards')
        .expect(200);

      expect(response.body).toHaveProperty('success', true);
      expect(response.body).toHaveProperty('cards');
      expect(Array.isArray(response.body.cards)).toBe(true);
    });
  });

  describe('POST /api/cards', () => {
    it('should create a new card for business user', async () => {
      const cardData = {
        title: 'Test Company',
        subtitle: 'Software Development',
        description: 'We build amazing software',
        phone: '0502345678',
        email: 'contact@testcompany.com',
        address: {
          country: 'Israel',
          city: 'Tel Aviv',
          street: 'Dizengoff',
          houseNumber: 100
        }
      };

      const response = await request(app)
        .post('/api/cards')
        .set('Authorization', `Bearer ${authToken}`)
        .send(cardData)
        .expect(201);

      expect(response.body).toHaveProperty('success', true);
      expect(response.body).toHaveProperty('card');
      expect(response.body.card.title).toBe(cardData.title);
      expect(response.body.card).toHaveProperty('bizNumber');
    });

    it('should reject card creation for non-business user', async () => {
      // Create regular user
      const regularUser = {
        name: { first: 'Regular', last: 'User' },
        email: 'regular@example.com',
        password: 'Test@1234',
        phone: '0503456789',
        address: {
          country: 'Israel',
          city: 'Tel Aviv',
          street: 'Test St',
          houseNumber: 2
        },
        isBusiness: false
      };

      const userResponse = await request(app)
        .post('/api/users')
        .send(regularUser);

      const regularToken = userResponse.body.token;

      const cardData = {
        title: 'Test Card',
        subtitle: 'Test Subtitle',
        description: 'Test Description',
        phone: '0504567890',
        email: 'card@test.com',
        address: {
          country: 'Israel',
          city: 'Tel Aviv',
          street: 'Test',
          houseNumber: 1
        }
      };

      const response = await request(app)
        .post('/api/cards')
        .set('Authorization', `Bearer ${regularToken}`)
        .send(cardData)
        .expect(403);

      expect(response.body).toHaveProperty('error');
    });
  });

  describe('PATCH /api/cards/:id/like', () => {
    it('should toggle like on a card', async () => {
      // Create a card first
      const cardData = {
        title: 'Test Card',
        subtitle: 'For Like Test',
        description: 'Testing like functionality',
        phone: '0505678901',
        email: 'like@test.com',
        address: {
          country: 'Israel',
          city: 'Tel Aviv',
          street: 'Like St',
          houseNumber: 1
        }
      };

      const cardResponse = await request(app)
        .post('/api/cards')
        .set('Authorization', `Bearer ${authToken}`)
        .send(cardData);

      const cardId = cardResponse.body.card._id;

      // Toggle like
      const likeResponse = await request(app)
        .patch(`/api/cards/${cardId}/like`)
        .set('Authorization', `Bearer ${authToken}`)
        .expect(200);

      expect(likeResponse.body).toHaveProperty('success', true);
      expect(likeResponse.body).toHaveProperty('message');
    });
  });
});
