import * as fs from 'fs';
import { join } from 'path';

const rootPath = process.cwd();

const sslCertPath = join(rootPath, 'public', 'sa-east-1-bundle.pem');

const ormConfig = {
  type: 'postgres' as const,
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5432', 10),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [join(rootPath, 'dist/**/*.entity{.ts,.js}')],
  migrations: [join(rootPath, 'dist/migrations/*{.ts,.js}')],
  synchronize: process.env.DB_SYNCHRONIZE === 'true',
  logging: process.env.DB_LOGGING === 'true',
  schema: process.env.DB_SCHEMA,
  ssl: {
    rejectUnauthorized: process.env.DB_REJECT_UNAUTHORIZED === 'true',
    ca: fs.readFileSync(sslCertPath).toString(),
  },
  options: {
    encrypt: process.env.DB_ENCRYPT === 'true',
    trustServerCertificate: process.env.DB_TRUST_SERVER_CERTIFICATE === 'true',
    integratedSecurity: process.env.DB_INTEGRATED_SECURITY === 'true',
  },
};

// Ajusta as opções baseado nas variáveis de ambiente
if (process.env.BD_HAS_OPTIONS !== 'true') {
  delete ormConfig.options;
} else if (!process.env.DB_ENCRYPT && ormConfig.options) {
  delete ormConfig.options.encrypt;
}

if (process.env.DB_DOMAIN_CONTROLLER) {
  (ormConfig as any).domain = process.env.DB_DOMAIN_CONTROLLER;
}

export default ormConfig;
