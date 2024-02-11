import cookie from '@fastify/cookie';
import { randomUUID } from 'crypto';
import { FastifyInstance } from 'fastify';
import gradient from 'gradient-string';

export default class CookieConfig {

  public async configureCookie() {
    this.fastify.register(cookie, {
      secret: 'aksjdwd-amddds-eji3u99',
      hook: 'onRequest',
      parseOptions: {},
    });

  }

  public async createCookie() {
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
        console.log(`-> ${gradient.cristal('🍪 [COOKIE] COOKIE CRIADO')}`);
      }
      
    });
  }

  constructor(private fastify: FastifyInstance) {
    this.configureCookie = this.configureCookie.bind(this);
    this.createCookie = this.createCookie.bind(this);
  }
}
