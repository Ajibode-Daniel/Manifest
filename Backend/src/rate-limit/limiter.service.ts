import { Injectable } from '@nestjs/common';
import { RateLimiterRedis } from 'rate-limiter-flexible';
import * as Redis from 'ioredis';

const client = new Redis(process.env.REDIS_URL);

const rateLimiter = new RateLimiterRedis({
  storeClient: client,
  points: 10, // number of requests
  duration: 60 * 60, // per hour
});

@Injectable()
export class LimiterService {
  async consume(key: string) {
    try {
      await rateLimiter.consume(key);
      return true;
    } catch {
      return false;
    }
  }
}
