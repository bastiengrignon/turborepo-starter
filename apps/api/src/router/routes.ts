import type { FastifyInstance } from 'fastify';

import { HTTP_CODES } from '../constants';
import { auth } from '../utils/auth';
import { healthcheckRoutes } from './routes/healthcheck';

export const routes = async (app: FastifyInstance) => {
  healthcheckRoutes({ app });
  app.route({
    method: ['GET', 'POST'],
    url: '/auth/*',
    async handler(request, reply) {
      try {
        const url = new URL(request.url, `http://${request.headers.host}`);

        const headers = new Headers();
        Object.entries(request.headers).forEach(([key, value]) => {
          if (value) headers.append(key, value.toString());
        });

        const req = new Request(url.toString(), {
          method: request.method,
          headers,
          body: request.body ? JSON.stringify(request.body) : undefined,
        });

        const response = await auth.handler(req);

        reply.status(response.status);
        response.headers.forEach((value, key) => {
          reply.header(key, value);
        });
        reply.send(response.body ? await response.text() : null);
      } catch (error) {
        app.log.error(`Authentication Error: ${error}`);
        reply.status(HTTP_CODES.INTERNAL_SERVER_ERROR).send({
          error: 'Internal authentication error',
          code: 'AUTH_FAILURE',
        });
      }
    },
  });
};
