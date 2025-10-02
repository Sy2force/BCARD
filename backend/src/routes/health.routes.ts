// Route de health check pour v\u00e9rifier que le serveur est actif
// Utilis\u00e9 par Render pour surveiller l'\u00e9tat du service

import { Router, Request, Response } from 'express';

const router = Router();

// Health check endpoint
router.get('/health', (_req: Request, res: Response) => {
  res.status(200).json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    service: 'facework-backend',
    version: process.env.npm_package_version || '1.0.0',
    environment: process.env.NODE_ENV || 'development'
  });
});

export default router;
