import z from "zod";
import { FastifyReply } from "fastify";
import { prisma } from "../../lib/prisma";
export default class PollValidator {
  protected pollCreateBody = z.object({
    title: z.string(),
    options: z.array(
      z.object({
        title: z.string(),
        value: z.optional(z.string()),
        votes: z.optional(z.number()),
      })
    ),
  });

  protected getPollParams = z.object({
    pollId: z.string().uuid(),
  });

  protected updatePoll = z.object({
    id: z.string().uuid(),
    title: z.string(),
    options: z.array(
      z.object({
        title: z.string(),
      })
    ),
  });

  protected deletePoll = z.object({
    id: z.string().uuid(),
  });

  protected async pollExists(polls: object, reply: FastifyReply) {
    console.log(polls);

    if (!polls) {
      return reply.status(400).send({ message: "Enquete não encontrada" });
    }
  }

  protected async validatePollExists(pollId: string, reply: FastifyReply) {
    const poll = await prisma.poll.findUnique({
      where: {
        id: pollId,
      }
    });

    if (!poll) {
      return reply.status(400).send({ message: "Enquete não encontrada" });
    }

    return poll;
  }

  constructor() {}
}