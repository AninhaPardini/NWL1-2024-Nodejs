import { FastifyReply, FastifyRequest, FastifyInstance } from "fastify";
import z, { optional } from "zod";
import { prisma } from "../../lib/prisma";
import CookieConfig from "../cookie/cookieConfig";
import VotesValidator from "../validators/votes.validator";

export default class VotesController extends CookieConfig implements VotesValidator {
  protected voteBody = z.object({
    pollOptionId: z.string().uuid(),
  });

  protected voteOnPollParams = z.object({
    pollId: z.string().uuid(),
  });

  async vote(request: FastifyRequest, reply: FastifyReply) {
    console.log("🚏 [ VOTES CONTROLER ] VOTANDO");

    const { pollOptionId } = this.voteBody.parse(request.body);
    const { pollId } = this.voteOnPollParams.parse(request.params);
    const { sessionId } =  request.cookies;

    if (!sessionId) {
      return;
    }

    await prisma.vote.create({
      data: {
        pollOptionId,
        pollId,
        sessionId,
      },
    });

    return reply.status(201).send({ sessionId });
    
  }

  async getVotes(request: FastifyRequest, reply: FastifyReply) {
    console.log("🚏 [POLL CONTROLER] PEGANDO A ENQUETE");

    return reply.send();
  }

  constructor(fastify: FastifyInstance) {
    super(fastify);
    this.vote = this.vote.bind(this);
    this.getVotes = this.getVotes.bind(this);
    // this.delete = this.delete.bind(this);
  }

}

module.exports = VotesController;
