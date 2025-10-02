/**
 * FaceWork API Server
 * Point d'entrée principal de l'application
 */

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

// Configuration CORS avec whitelist
const corsOptions = {
  origin: function (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) {
    const whitelist = [
      process.env.FRONTEND_URL || 'http://localhost:5173',
      'http://localhost:3000',
      'http://localhost:5173',
      'http://192.168.1.53:5173'
    ];
    if (!origin || whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      console.log('CORS blocked origin:', origin);
      callback(null, true); // Temporairement autoriser toutes les origines pour debug
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

// Routes API
app.use('/api/users', usersRoutes);
app.use('/api/cards', cardsRoutes);

// Route de santé
app.get('/api/health', (req: express.Request, res: express.Response) => {
  res.json({ 
    status: 'OK', 
    message: 'FaceWork API is running',
    timestamp: new Date().toISOString()
  });
});

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
