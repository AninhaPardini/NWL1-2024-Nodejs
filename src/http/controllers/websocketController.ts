import { FastifyInstance } from "fastify";

type Message = { pollOptionId: string, votes: number};
type Subscriber = (message: Message) => void;

export class WebsocketController {
  private channels: Record<string, Subscriber[]> = {};

  constructor(private fastify: FastifyInstance) {}

  public subscribe(pollId: string, subscriber: Subscriber) {
    if (!this.channels[pollId]) {
      this.channels[pollId] = [];
    }

    this.channels[pollId].push(subscriber);
  }

  public publish(pollId: string, message: Message) {
    if (!this.channels[pollId]) {
      return;
    }

    this.channels[pollId].forEach((subscriber) => {
      subscriber(message);
    });
  }
}
