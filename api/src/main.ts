import { NestFactory } from '@nestjs/core';
import { ApiModule } from './api.module';
import { ValidationPipe } from '@nestjs/common';

/**
 * Main NestJS Application bootstrap
 */
async function bootstrap() {

  const app = await NestFactory.create(ApiModule);
  // Apply the ValidationPipe globally
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(process.env.PORT ?? 3000, process.env.HOST ?? '127.0.0.1');
}

bootstrap();
