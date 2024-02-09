import cookie from '@fastify/cookie';
import { randomUUID } from 'crypto';
import { FastifyInstance } from 'fastify';

export default class CookieConfig {
  constructor(private fastify: FastifyInstance) {}

  async configureCookie() {
    this.fastify.register(cookie, {
      secret: 'aksjdwd-amddds-eji3u99',
      hook: 'onRequest',
      parseOptions: {},
    });

  }

  async createCookie() {
    this.fastify.addHook('onRequest', async (request, reply) => {
      let { sessionId } = request.cookies;

      if (!sessionId) {
        sessionId = randomUUID();

        reply.setCookie('sessionId', sessionId, {
          path: '/',
          secure: true,
          maxAge: 60 * 60 * 24 * 30,
          signed: true,
          httpOnly: true,
        });

        console.log('🍪 [COOKIE] COOKIE CRIADO');
      }
    });
  }
}
