/**
 * Logger personnalisé pour les erreurs >= 400
 */

import fs from 'fs';
import path from 'path';
import { Request, Response, NextFunction } from 'express';

const fileLogger = (req: Request, res: Response, next: NextFunction) => {
  const originalSend = res.send;
  
  (res as any).send = function(this: Response, data: any): Response {
    // Log uniquement les erreurs (status >= 400)
    if (res.statusCode >= 400) {
      const logDir = path.join(__dirname, '..', 'logs');
      const today = new Date().toISOString().split('T')[0];
      const logFile = path.join(logDir, `${today}.log`);
      
      let errorData;
      try {
        errorData = JSON.parse(data || '{}');
      } catch (e) {
        errorData = { message: data };
      }

      const logEntry = {
        timestamp: new Date().toISOString(),
        method: req.method,
        url: req.originalUrl,
        status: res.statusCode,
        ip: req.ip,
        userAgent: req.get('user-agent'),
        body: req.body,
        error: errorData
      };
      
      // Créer le dossier logs s'il n'existe pas
      if (!fs.existsSync(logDir)) {
        fs.mkdirSync(logDir, { recursive: true });
      }
      
      fs.appendFile(logFile, JSON.stringify(logEntry) + '\n', (err) => {
        if (err && process.env.NODE_ENV !== 'production') {
          console.error('Failed to write log:', err);
        }
      });
    }
    
    return originalSend.call(this, data);
  };
  
  next();
};

export default fileLogger;
