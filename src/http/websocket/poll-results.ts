import { FastifyInstance } from "fastify";
import { WebsocketController } from "../controllers/websocketController";
import z from "zod";


export async function pollResults(app: FastifyInstance) {
  app.get('/polls/:pollId/results', { websocket: true }, (connection, request) => {
    const getPollParams = z.object({
      pollId: z.string().uuid(),

    })

    const websocketC = new WebsocketController(app);

    const { pollId } = getPollParams.parse(request.params)

    websocketC.subscribe(pollId, (message) => {
      connection.socket.send(JSON.stringify(message))
    });
  })
}