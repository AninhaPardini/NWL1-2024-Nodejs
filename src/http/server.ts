import fastify from "fastify";
import Routes from "./routes/routes";
import PollController from "./controllers/pollController";
import VotesController from "./controllers/votesController";
import CookieConfig from "./cookie/cookieConfig";

const app = fastify();
const cookie = new CookieConfig(app);
cookie.configureCookie();
cookie.createCookie();

const pollController = new PollController();
const votesController = new VotesController(app);

const routes = new Routes(app, pollController, votesController);
routes.configureRoutes();

app.listen({ port: 3000 }).then(() => {
  console.log("Server is running on port 3000");
});
