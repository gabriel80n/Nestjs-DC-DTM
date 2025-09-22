import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import 'dotenv/config';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';

dotenv.config();

export default async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Pipes
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  app.enableCors({ origin: '*' });
  //app.listen(3000);
  return app;
}

bootstrap();
