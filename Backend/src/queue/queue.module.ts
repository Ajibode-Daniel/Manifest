import { Module } from '@nestjs/common';
import { Queue } from 'bullmq';
import IORedis from 'ioredis';

const connection = new IORedis(process.env.REDIS_URL);

export const TTS_QUEUE = new Queue('tts', { connection });
export const IMAGE_QUEUE = new Queue('image', { connection });

@Module({
  providers: [],
  exports: [TTS_QUEUE, IMAGE_QUEUE],
})
export class QueueModule {}
