import { FastifyInstance } from "fastify";
import PollController from "./controllers/pollController";


export default class Routes {
  constructor(private fastify: FastifyInstance, private pollController: PollController) {}

  configureRoutes() {
    // this.fastify.get('/polls/:id', this.pollController.get.bind(this.pollController));
    this.fastify.post('/polls', this.pollController.create.bind(this.pollController));
    // this.fastify.put('/polls/:id', this.pollController.update.bind(this.pollController));
    // this.fastify.delete('/polls/:id', this.pollController.delete.bind(this.pollController));
  }

}
