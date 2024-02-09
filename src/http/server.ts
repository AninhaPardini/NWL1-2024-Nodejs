import fastify from "fastify";
import Routes from "./routes/routes";
import PollController from "./routes/controllers/pollController";
import VotesController from "./routes/controllers/votesController";
import CookieConfig from "./cookie/cookieConfig";


const app = fastify();
const cookie = new CookieConfig(app);
cookie.configureCookie();

const pollController = new PollController();
const votesController = new VotesController();

const routes = new Routes(app, pollController, votesController);
routes.configureRoutes();

app.listen({ port: 3000 }).then(() => {
  console.log("Server is running on port 3000");
});
