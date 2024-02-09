import { FastifyInstance } from "fastify";
import PollController from "../controllers/pollController";
import VotesController from "../controllers/votesController";


export default class Routes {
  constructor(private fastify: FastifyInstance, private pollController: PollController, private votesController: VotesController) {}

  configureRoutes() {
    this.fastify.get('/polls/:pollId', this.pollController.get.bind(this.pollController));
    this.fastify.get('/polls', this.pollController.getAll.bind(this.pollController));
    this.fastify.post('/polls', this.pollController.create.bind(this.pollController));
    // this.fastify.put('/polls/:id', this.pollController.update.bind(this.pollController));
    // this.fastify.delete('/polls/:id', this.pollController.delete.bind(this.pollController));

    this.fastify.post('/polls/:pollId/votes', this.votesController.vote.bind(this.votesController));
    this.fastify.get('/polls/:pollId/votes', this.votesController.getVotes.bind(this.votesController));

  }

}
