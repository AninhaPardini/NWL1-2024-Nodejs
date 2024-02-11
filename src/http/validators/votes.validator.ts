import z from "zod";
import { prisma } from "../../lib/prisma";
import { FastifyReply } from "fastify";
import { redis, redisDeleteCounter } from "../../lib/redis";
import { WebsocketController } from "../controllers/websocketController";

export default class VotesValidator {
  public websocketController: WebsocketController;

  protected voteBody = z.object({
    pollOptionId: z.string().uuid(),
  });

  protected voteOnPollParams = z.object({
    pollId: z.string().uuid(),
  });

  protected async isAlreadyVoted(sessionId: string, pollId: string, pollOptionId: string, reply: FastifyReply) {
    const userPreviousVote = await prisma.vote.findUnique({
      where: {
        pollId_sessionId: {
          pollId,
          sessionId,
        },
      },
    });

    if (userPreviousVote && userPreviousVote.pollOptionId !== pollOptionId) {
      await prisma.vote.delete({
        where: {
          id: userPreviousVote.id,
        },
      });

      const votes = await redisDeleteCounter(pollId, userPreviousVote.pollOptionId);

      this.websocketController.publish(pollId, {
        pollOptionId: userPreviousVote.pollOptionId,
        votes: Number(votes),
      });

    } else if (userPreviousVote && userPreviousVote.pollOptionId === pollOptionId) {
      return reply.status(400).send({ message: "Você já votou nessa enquete" });
    }
    
  }

  constructor() {
    
  }

}