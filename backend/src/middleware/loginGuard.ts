/**
 * Middleware de protection contre le brute force
 * Bloque après 3 tentatives échouées
 */

import { Request, Response, NextFunction } from 'express';
import User from '../models/User';

const loginGuard = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { email } = req.body;
    
    if (!email) {
      return next();
    }

    const user = await User.findOne({ email });
    
    if (!user) {
      return next();
    }

    // Vérifier si le compte est verrouillé
    if ((user as any).isLocked) {
      const lockTime = Math.round(((user.lockUntil?.getTime() || 0) - Date.now()) / 1000 / 60 / 60);
      return res.status(423).json({ 
        error: `Account locked. Try again in ${lockTime} hours.` 
      });
    }

    next();
  } catch (error) {
    next(error);
  }
};

export default loginGuard;
