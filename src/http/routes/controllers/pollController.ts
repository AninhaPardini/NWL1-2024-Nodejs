import { FastifyReply, FastifyRequest } from "fastify";
import z, { optional } from "zod";
import { prisma } from "../../../lib/prisma";

export default class PollController {
  protected pollBody = z.object({
    
    title: z.string(),
    options: z.array(
      z.object({
        title: z.string(),
        value: z.optional(z.string()),
        votes: z.optional(z.number()),
      })
    ),
  });

  async create(request: FastifyRequest, reply: FastifyReply) {
    console.log("🚏 [POLL CONTROLER] CRIANDO A ENQUETE");
    console.log(request.body);
    
    const { title, options } = this.pollBody.parse(request.body);
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
              })
            }
              
          },
        },
      });

      return reply.status(201).send({ pollId: poll.id });
    } catch (error) {
      console.log(error);
      return reply.status
    }
  }

  // async get(request: FastifyRequest, reply: FastifyReply) {
  //   console.log("🚏 [POLL CONTROLER] PEGANDO A ENQUETE");
    
  //     const { id } = this.pollBody.parse(request.body);

  //     const poll = await prisma.poll.findUnique({
  //       where: {
  //         id,
  //       },
  //     });

  //     return reply.status(200).send(poll);
  // }

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
    
  //     const { title, options, id } = this.pollBody.parse(request.body);

  //     const poll = await prisma.poll.update({
  //       where: {
  //         id,
  //       },
  //       data: {
  //         title,
  //       },
  //     });

  //     return reply.status(200).send(poll);
  // }

  constructor() {
    this.create = this.create.bind(this);
    // this.get = this.get.bind(this);
    // this.delete = this.delete.bind(this);
  }
}

module.exports = PollController;
