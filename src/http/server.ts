import fastify from 'fastify';
import Routes from './routes/routes';
import PollController from './controllers/pollController';
import VotesController from './controllers/votesController';
import CookieConfig from './cookie/cookieConfig';
import gradient from 'gradient-string';
import figlet from 'figlet';

const app = fastify();
const cookie = new CookieConfig(app);
cookie.configureCookie();
cookie.createCookie();

const pollController = new PollController();
const votesController = new VotesController();

const routes = new Routes(app, pollController, votesController);
routes.configureRoutes();

const port = process.env.PORT || 3000;

app.listen({port: 3000}).then(() => {
  
  figlet(process.env.APP_NAME!, (_, screen) => {
    console.log(gradient.vice(screen));
    console.log(`-> ${gradient.cristal(`💻 [ ENVIRONMENT ] `)}${process.env.NODE_ENV}`);
    console.log(`-> ${gradient.cristal('🔌 [ INICIANDO SERVIDOR ] ')}Conectando os cabos`);
    console.log(`-> ${gradient.cristal('🎲 [ INICIANDO SERVIDOR ] ')}Conectando aos bancos de dados`);
    console.log(`-> ${gradient.cristal('🚏 [ INICIANDO SERVIDOR ] ')}Conectando endpoints`);
    console.log(`-> ${gradient.cristal('🍪 [ INICIANDO SERVIDOR ] ')}Configurando cookies`);
    console.log(`-> ${gradient.cristal('✅ [ ESTÁ NO AR ] ')}Servidor rodando na porta 3000`);
  });
});
