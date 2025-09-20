import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import 'dotenv/config';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { AppDataSource } from './database/data_source';

dotenv.config();

export default async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Pipes
  await AppDataSource.initialize();
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  app.enableCors({ origin: '*' });
  return app;
}

bootstrap();
