import { FastifyReply, FastifyRequest } from "fastify";
import z, { optional } from "zod";
import { prisma } from "../../lib/prisma";
import gradient from "gradient-string";
import PollValidator from "../validators/poll.validator";
import { redisGetAllCounters } from "../../lib/redis";

export default class PollController extends PollValidator {
  async create(request: FastifyRequest, reply: FastifyReply) {
    console.log(
      `-> ${gradient.cristal("🧠 [POLL CONTROLER] CRIANDO A ENQUETE")}`
    );

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
    console.log(
      `-> ${gradient.cristal("🧠 [POLL CONTROLER] PEGANDO A ENQUETE")}`
    );

    const { pollId } = this.getPollParams.parse(request.params);

    const poll = await prisma.poll.findUnique({
      where: {
        id: pollId,
      },
      include: {
        options: {
          select: {
            id: true,
            title: true,
          },
        },
      },
    });

    this.validatePollExists(pollId, reply);

    const votes = await redisGetAllCounters(pollId);

    if (poll && poll.options) {
      return reply.send({
        poll: {
          id: poll.id,
          title: poll.title,
          options: poll.options.map((option) => {
            return {
              id: option.id,
              title: option.title,
              score: option.id in votes ? votes[option.id] : 0,
            };
          }),
        },
      });
    } else {
      return reply.status(400).send({ message: "Enquete não encontrada" });
    }
  }

  async getAll(request: FastifyRequest, reply: FastifyReply) {
    console.log(
      `-> ${gradient.cristal("🧠 [POLL CONTROLER] PEGANDO TODAS AS ENQUETES")}`
    );

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

    this.pollExists(polls, reply);

    return reply.send({ polls });
  }

  // async delete(request: FastifyRequest, reply: FastifyReply) {
  // console.log(`-> ${gradient.cristal('🧠 [POLL CONTROLER] DELETANDO A ENQUETE')}`);

  //     const { id } = this.deletePoll.parse(request.body);

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
    super();
    this.create = this.create.bind(this);
    this.get = this.get.bind(this);
    // this.delete = this.delete.bind(this);
  }
}

module.exports = PollController;
