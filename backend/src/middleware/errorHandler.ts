/**
 * Gestionnaire d'erreurs global
 */

import { Request, Response, NextFunction } from 'express';

const errorHandler = (err: any, req: Request, res: Response, next: NextFunction) => {
  // Log errors only in development
  if (process.env.NODE_ENV !== 'production') {
    console.error('Error:', err);
  }

  // Erreur de validation Mongoose
  if (err.name === 'ValidationError') {
    const errors = Object.values(err.errors).map((e: any) => e.message);
    if (process.env.NODE_ENV !== 'production') {
      console.error('Validation Error Details:', err.errors);
    }
    return res.status(400).json({ 
      error: 'Validation Error',
      details: errors 
    });
  }

  // Erreur de clé dupliquée
  if (err.code === 11000) {
    const field = Object.keys(err.keyPattern)[0];
    return res.status(400).json({ 
      error: `${field} already exists` 
    });
  }

  // Erreurs JWT
  if (err.name === 'JsonWebTokenError') {
    return res.status(401).json({ error: 'Invalid token' });
  }

  if (err.name === 'TokenExpiredError') {
    return res.status(401).json({ error: 'Token expired' });
  }

  // Erreur CastError (ObjectId invalide)
  if (err.name === 'CastError') {
    return res.status(400).json({ error: 'Invalid ID format' });
  }

  // Erreur de validation Joi
  if (err.isJoi) {
    if (process.env.NODE_ENV !== 'production') {
      console.error('Joi Validation Error:', err.details);
    }
    return res.status(400).json({
      error: 'Validation failed',
      details: err.details.map((d: any) => d.message)
    });
  }

  // Erreur par défaut
  res.status(err.status || 500).json({ 
    error: err.message || 'Internal server error' 
  });
};

export default errorHandler;
