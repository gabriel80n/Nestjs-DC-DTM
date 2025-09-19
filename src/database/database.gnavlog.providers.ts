import * as dotenv from 'dotenv';

import { DataSource, DataSourceOptions } from 'typeorm';

dotenv.config();

const optionsDatabase = {
  type: process.env.DB_XPERIENCE_TYPE || 'mssql',
  host: process.env.DB_XPERIENCE_HOST,
  port: parseInt(process.env.DB_XPERIENCE_PORT, 10),
  username: process.env.DB_XPERIENCE_USERNAME,
  password: process.env.DB_XPERIENCE_PASSWORD,
  database: process.env.DB_XPERIENCE_DATABASE,
  entities: ['dist/**/*.sql.entity{.ts,.js}'],
  synchronize: false,
  logging: process.env?.DB_XPERIENCE_LOGGING == 'true',
  schema: process.env.DB_XPERIENCE_SCHEMA,
  options: {
    encrypt: process.env?.DB_XPERIENCE_ENCRYPT == 'true',
    trustServerCertificate:
      process.env?.DB_XPERIENCE_TRUST_SERVER_CERTIFICATE == 'true',
    integratedSecurity: process.env?.DB_XPERIENCE_INTEGRATED_SECURITY == 'true',
  },
};

if (process.env.DB_HAS_OPTIONS !== 'true') delete optionsDatabase.options;
if (process.env.DB_XPERIENCE_DOMAIN_CONTROLLER)
  optionsDatabase['domain'] = process.env.DB_XPERIENCE_DOMAIN_CONTROLLER;
if (!process.env.DB_XPERIENCE_ENCRYPT) delete optionsDatabase.options.encrypt;

console.log('optionsDatabase', optionsDatabase);

export const dataSourceOptions_gnavlog: DataSourceOptions =
  optionsDatabase as DataSourceOptions;

const dataSource = new DataSource(dataSourceOptions_gnavlog);
export default dataSource;
