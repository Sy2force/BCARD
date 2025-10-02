import swaggerUi from 'swagger-ui-express';
import { Express } from 'express';
import swaggerDocument from './swagger.json';

export const setupSwagger = (app: Express) => {
  // Swagger UI options
  const options = {
    explorer: true,
    customCss: '.swagger-ui .topbar { display: none }',
    customSiteTitle: 'FaceWork API Documentation',
  };

  // Setup swagger documentation
  app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, options));

  if (process.env.NODE_ENV !== 'production') {
    console.log('📚 API Documentation available at: http://localhost:5001/api/docs');
  }
};
