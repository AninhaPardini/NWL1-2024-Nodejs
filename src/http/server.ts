import fastify from 'fastify';
import Routes from './routes/routes';
import PollController from './routes/controllers/pollController';

const app = fastify();

// Cria uma instância do UserController
const pollController = new PollController();

// Cria uma instância do UserRoutes e configura as rotas
const routes = new Routes(app, pollController);
routes.configureRoutes();

app.listen({ port: 3000 }).then(() => {
  console.log('Server is running on port 3000');
});

