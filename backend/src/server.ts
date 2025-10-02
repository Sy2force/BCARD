// Serveur principal FaceWork
// Ce fichier démarre l'API REST et configure tous les middlewares
// Port par défaut : 5001

import dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import path from 'path';
import fs from 'fs';

// Import configuration et middleware
import connectDB from './config/db';
import errorHandler from './middleware/errorHandler';
import fileLogger from './middleware/fileLogger';

// Import des routes
import usersRoutes from './routes/users.routes';
import cardsRoutes from './routes/cards.routes';
import healthRoutes from './routes/health.routes';

dotenv.config();

// Initialisation Express
const app = express();

// Connexion MongoDB
connectDB();

// Création du dossier logs si inexistant
const logsDir = path.join(__dirname, 'logs');
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true });
}

// Configuration CORS pour accepter les requêtes du frontend
const corsOptions = {
  origin: function (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) {
    // Liste des origines autorisées
    const whitelist = [
      process.env.FRONTEND_URL || 'http://localhost:5173',
      'http://localhost:5173',
      'http://localhost:3000',
      'https://facework.vercel.app',  // Production Vercel
      'https://facework-*.vercel.app' // Preview deployments Vercel
    ];
    
    // Accepter les requêtes sans origine (Postman, curl, etc.) ou dans la whitelist
    if (!origin || whitelist.some(allowed => 
      origin === allowed || 
      (allowed.includes('*') && origin.match(new RegExp(allowed.replace('*', '.*'))))
    )) {
      callback(null, true);
    } else {
      // En production, bloquer les origines non autorisées
      if (process.env.NODE_ENV === 'production') {
        callback(new Error('CORS: Origine non autorisée'));
      } else {
        // En dev, on log mais on autorise pour faciliter les tests
        console.log('CORS warning - origine non whitelist:', origin);
        callback(null, true);
      }
    }
  },
  credentials: true
};

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limite à 100 requêtes par IP
  message: 'Too many requests from this IP, please try again later.'
});

// Middleware globaux
app.use(helmet());
app.use(cors(corsOptions));
app.use('/api/', limiter);
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Logging
if (process.env.NODE_ENV !== 'production') {
  app.use(morgan('dev'));
}
app.use(fileLogger);

// Routes
app.use('/api', healthRoutes);
app.use('/api/users', usersRoutes);
app.use('/api/cards', cardsRoutes);

// 404 handler
app.use((req: express.Request, res: express.Response) => {
  res.status(404).json({ 
    error: 'Route not found',
    path: req.originalUrl 
  });
});

// Error handler (doit être en dernier)
app.use(errorHandler);

// Démarrage du serveur
const PORT = process.env.PORT || 5001;
const server = app.listen(PORT, () => {
  if (process.env.NODE_ENV !== 'production') {
    console.log(`🚀 FaceWork server running on port ${PORT}`);
    console.log(`📍 Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`✅ MongoDB connected`);
  }
});

// Gestion gracieuse de l'arrêt
process.on('SIGTERM', () => {
  server.close(() => {
    console.log('Process terminated');
  });
});
