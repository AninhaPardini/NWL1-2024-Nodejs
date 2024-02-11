import { FastifyReply, FastifyRequest, FastifyInstance } from "fastify";
import { prisma } from "../../lib/prisma";
import VotesValidator from "../validators/votes.validator";
import gradient from "gradient-string";
import redisAddCounter, { redis } from "../../lib/redis";

export default class VotesController extends VotesValidator {

  async vote(request: FastifyRequest, reply: FastifyReply) {
    console.log(`-> ${gradient.cristal('🧠 [ VOTES CONTROLER ] VOTANDO')}`);

    const { pollOptionId } = this.voteBody.parse(request.body);
    const { pollId } = this.voteOnPollParams.parse(request.params);
    const { sessionId } =  request.cookies;

    if (!sessionId) {
      return;
    }

    this.isAlreadyVoted(sessionId, pollId, pollOptionId, reply);

    await prisma.vote.create({
      data: {
        pollOptionId,
        pollId,
        sessionId,
      },
    });

    await redisAddCounter(pollId, pollOptionId);
    
    return reply.status(201).send(`Você votou na opção ${pollOptionId}`);
    
  }

  // async getVotes(request: FastifyRequest, reply: FastifyReply) {
  //   console.log("🚏 [POLL CONTROLER] PEGANDO A ENQUETE");

  //   return reply.send();
  // }

  constructor() {
    super();
    this.vote = this.vote.bind(this);
    // this.getVotes = this.getVotes.bind(this);
    // this.delete = this.delete.bind(this);
  }

}

module.exports = VotesController;
