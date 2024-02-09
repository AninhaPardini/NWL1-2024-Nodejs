import { FastifyReply, FastifyRequest } from "fastify";
import z, { optional } from "zod";
import { prisma } from "../../../lib/prisma";

export default class PollController {
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

  async create(request: FastifyRequest, reply: FastifyReply) {
    console.log("🚏 [POLL CONTROLER] CRIANDO A ENQUETE");
    console.log(request.body);

    const { title, options } = this.pollCreateBody.parse(request.body);
    try {
      const poll = await prisma.poll.create({
        data: {
          title,
          options: {
            createMany: {
              data: options.map((option) => {
                return {
                  title: option.title,
                };
              }),
            },
          },
        },
      });

      return reply.status(201).send({ pollId: poll.id });
    } catch (error) {
      console.log(error);
      return reply.status;
    }
  }

  async get(request: FastifyRequest, reply: FastifyReply) {
    console.log("🚏 [POLL CONTROLER] PEGANDO A ENQUETE");

    const { pollId } = this.getPollParams.parse(request.params);

    const poll = await prisma.poll.findUnique({
      where: {
        id: pollId,
      },
      include: {
        options: true,
      },
    });

    return reply.send({ poll });
  }

  async getAll(request: FastifyRequest, reply: FastifyReply) {
    console.log("🚏 [POLL CONTROLER] PEGANDO TODAS AS ENQUETES");

    const polls = await prisma.poll.findMany({
      include: {
        options: {
          select: {
            id: true,
            title: true,
          },
        },
      },
    });

    return reply.send({ polls });
  }

  // async delete(request: FastifyRequest, reply: FastifyReply) {
  //   console.log("🚏 [POLL CONTROLER] DELETANDO A ENQUETE");

  //     const { id } = this.pollBody.parse(request.body);

  //     await prisma.poll.delete({
  //       where: {
  //         id,
  //       },
  //     });

  //     return reply.status(204).send();
  // }

  // async update(request: FastifyRequest, reply: FastifyReply) {
  //   console.log("🚏 [POLL CONTROLER] ATUALIZANDO A ENQUETE");

  //     const { title, options, id } = this.updatePoll.parse(request.body);

  //     const poll = await prisma.poll.upsert({
  //       where: {
  //         id,
  //       },
  //       update: {
  //         title,
  //         options: {
  //           deleteMany: {},
  //           createMany: {
  //             data: options.map((option) => {
  //               return {
  //                 title: option.title,
  //               };
  //             }),
  //           },
  //         },
  //       },
        
  //     });

  //     return reply.status(200).send(poll);
  // }

  constructor() {
    this.create = this.create.bind(this);
    this.get = this.get.bind(this);
    // this.delete = this.delete.bind(this);
  }
}

module.exports = PollController;
