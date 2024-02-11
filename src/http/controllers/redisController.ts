import gradient from "gradient-string";
import { redis } from "../../lib/redis";

export default class RedisController {

  async addCounter(pollId: string, pollOptionId: string) {
    console.log(`-> ${gradient.cristal('🧠 [ REDIS CONTROLER ] ')}Adicionando ao contador de votos`);

    await redis.zincrby(pollId, 1, pollOptionId);
  }
}