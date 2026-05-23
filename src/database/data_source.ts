/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable prettier/prettier */
import * as fs from 'fs';
import { join } from 'path';

const rootPath = process.cwd();

const sslCertPath = join(rootPath, 'public', 'us-east-1-bundle.pem');

const ormConfig = {
  type: 'postgres' as const,
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5432', 10),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [join(rootPath, 'dist/database/entities/*{.ts,.js}')],
  migrations: [join(rootPath, 'dist/migrations/*{.ts,.js}')],
  synchronize: process.env.DB_SYNCHRONIZE === 'true',
  logging: process.env.DB_LOGGING === 'true',
  schema: process.env.DB_SCHEMA,
  ssl: false,
};

if (process.env.DB_DOMAIN_CONTROLLER) {
  (ormConfig as any).domain = process.env.DB_DOMAIN_CONTROLLER;
}

export default ormConfig;
