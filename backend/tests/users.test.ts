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
import userRoutes from '../src/routes/users.routes';
app.use('/api/users', userRoutes);

// Error handler (must be last)
app.use(errorHandler);

let mongoServer: MongoMemoryServer;

describe('Users API', () => {
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
  });

  describe('POST /api/users', () => {
    it('should register a new user', async () => {
      const userData = {
        name: { first: 'John', last: 'Doe' },
        email: 'test@example.com',
        password: 'Test@1234',
        phone: '0501234567',
        address: {
          country: 'Israel',
          city: 'Tel Aviv',
          street: 'Test St',
          houseNumber: 1
        }
      };

      const response = await request(app)
        .post('/api/users')
        .send(userData)
        .expect(201);

      expect(response.body).toHaveProperty('success', true);
      expect(response.body).toHaveProperty('user');
      expect(response.body).toHaveProperty('token');
      expect(response.body.user.email).toBe(userData.email);
    });
  });

  describe('POST /api/users/login', () => {
    it('should login and return token', async () => {
      // First register a user
      const userData = {
        name: { first: 'John', last: 'Doe' },
        email: 'test@example.com',
        password: 'Test@1234',
        phone: '0501234567',
        address: {
          country: 'Israel',
          city: 'Tel Aviv',
          street: 'Test St',
          houseNumber: 1
        }
      };

      await request(app)
        .post('/api/users')
        .send(userData);

      // Then login
      const response = await request(app)
        .post('/api/users/login')
        .send({
          email: userData.email,
          password: userData.password
        })
        .expect(200);

      expect(response.body).toHaveProperty('success', true);
      expect(response.body).toHaveProperty('token');
      expect(response.body).toHaveProperty('user');
    });

    it('should reject invalid credentials', async () => {
      const response = await request(app)
        .post('/api/users/login')
        .send({
          email: 'nonexistent@example.com',
          password: 'WrongPass@123'
        })
        .expect(401);

      expect(response.body).toHaveProperty('error');
    });
  });
});
