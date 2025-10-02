/**
 * Middleware d'authentification JWT
 */

import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User';

interface JwtPayload {
  id: string;
  isBusiness: boolean;
  isAdmin: boolean;
}

// Vérification du token JWT
export const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.header('Authorization')?.replace('Bearer ', '');
    
    if (!token) {
      return res.status(401).json({ error: 'Access token required' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
    const user = await User.findById(decoded.id).select('-password');
    
    if (!user) {
      return res.status(401).json({ error: 'User not found' });
    }

    req.user = user as any;
    req.token = token;
    next();
  } catch (error: any) {
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ error: 'Invalid token' });
    }
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Token expired' });
    }
    res.status(401).json({ error: 'Authentication failed' });
  }
};

// Vérification si l'utilisateur est business
export const isBusiness = (req: Request, res: Response, next: NextFunction) => {
  if (!req.user?.isBusiness && !req.user?.isAdmin) {
    return res.status(403).json({ error: 'Business account required' });
  }
  next();
};

// Vérification si l'utilisateur est admin
export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
  if (!req.user?.isAdmin) {
    return res.status(403).json({ error: 'Admin privileges required' });
  }
  next();
};

// Vérification si l'utilisateur est propriétaire ou admin
export const isOwnerOrAdmin = async (req: Request, res: Response, next: NextFunction) => {
  const userId = req.params.id;
  
  if (req.user?._id.toString() !== userId && !req.user?.isAdmin) {
    return res.status(403).json({ error: 'Access denied' });
  }
  next();
};

