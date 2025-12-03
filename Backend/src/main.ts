import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import { ValidationPipe } from '@nestjs/common';
import { json } from 'express';
import { Logger } from './utils/logger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { logger: new Logger() });
  app.use(helmet());
  app.use(json({ limit: '1mb' }));
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  await app.listen(process.env.PORT || 4000);
  console.log(`Server started on ${await app.getUrl()}`);
}
bootstrap();
