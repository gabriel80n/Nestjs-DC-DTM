import * as dotenv from 'dotenv';

import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app.module';
import { INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { SecuritySchemeObject } from '@nestjs/swagger/dist/interfaces/open-api-spec.interface';

dotenv.config();

export async function app(): Promise<INestApplication> {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix(process.env.BASE_PATH);

  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('Bayer API - GNAVLOG_Operacoes')
    .setDescription(
      `Esta api requer autenticação via uma API externa. Para obter um usuario e token, acesse: 
      [Keycloak](${process.env.IDP_KEYCLOAK}) e consulte o cliente: 
      \`${process.env.IDP_CLIENT_ID}\` e o realm: \`${process.env.IDP_REALM}\`.\n\n` +
        `Para obter um token, utilize o endpoint: \`${process.env.IDP_KEYCLOAK}/realms/${process.env.IDP_REALM}/protocol/openid-connect/token\` ` +
        `com o método POST, passando o body como x-www-form-urlencoded com os seguintes campos:\n\n
      grant_type: password\n
      client_id: ${process.env.IDP_CLIENT_ID}\n
      username: <seu_usuario>\n
      password: <sua_senha>\n
      client_secret: <seu_secret>`,
    )
    .setVersion('1.0')
    .addBearerAuth({
      type: 'http',
      in: 'header',
      scheme: 'Bearer',
      bearerFormat: 'token',
      name: 'Authorization',
    } as SecuritySchemeObject)
    .addServer(process.env.BASE_URL, 'Produção')
    .addServer('http://localhost:3000', 'Localhost')
    .addSecurityRequirements('bearerAuth')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(process.env.SWAGGER_PATH, app, document);
  SwaggerModule.setup(
    `${process.env.BASE_PATH}/${process.env.SWAGGER_PATH}`,
    app,
    document,
  );

  return app;
}
