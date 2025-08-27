import type { FastifyInstance } from 'fastify';

const healthcheckSchema = {
  response: {
    200: {
      type: 'object',
      properties: {
        status: { type: 'string' },
        message: { type: 'string' },
      },
    },
  },
};

export const healthcheckRoutes = ({ app }: { app: FastifyInstance }) => {
  app.get('/healthcheck', { schema: healthcheckSchema }, async () => ({
    status: 'OK',
    message: 'API is healthy',
  }));
};
