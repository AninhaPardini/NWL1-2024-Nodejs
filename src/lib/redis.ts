import gradient from "gradient-string";
import { Redis } from "ioredis";

export const redis = new Redis();

export default function redisAddCounter(pollId: string, pollOptionId: string) {
  console.log(`-> ${gradient.cristal('🧠 [ REDIS CONTROLER ] ')}Adicionando ao contador de votos`);
  return redis.zincrby(pollId, 1, pollOptionId);
}

export function redisGetCounter(pollId: string, pollOptionId: string) {
  console.log(`-> ${gradient.cristal('🧠 [ REDIS CONTROLER ] ')}Pegando o contador de votos`);
  return redis.zscore(pollId, pollOptionId);
}

export async function redisGetAllCounters(pollId: string) {
  console.log(`-> ${gradient.cristal('🧠 [ REDIS CONTROLER ] ')}Pegando todos os contadores de votos`);

  const results = await redis.zrange(pollId, 0, -1, "WITHSCORES");
  const votes = results.reduce((obj, line, index) => {
    if (index % 2 === 0) {
      const score = Number(results[index + 1]);

      Object.assign(obj, { [line]: score });
    }
    return obj;
  }, {} as Record<string, number>);

  return votes;
}

export function redisDeleteCounter(pollId: string, pollOptionId: string) {
  console.log(`-> ${gradient.cristal('🧠 [ REDIS CONTROLER ] ')}Deletando o contador de votos`);
  return redis.zincrby(pollId, -1, pollOptionId);
}