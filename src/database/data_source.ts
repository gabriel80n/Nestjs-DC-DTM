import { DataSource } from 'typeorm';
import { User } from './entities/user.entity';
import { Patient } from './entities/patient.entity';
import { Exam } from './entities/exam.entity';
import { PasswordRecoveryCode } from './entities/password-recovery-code.entity';
import * as fs from 'fs';
import * as path from 'path';

const sslCertPath = path.resolve(
  __dirname,
  '../../bundle/sa-east-1-bundle.pem',
);

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [User, Patient, Exam, PasswordRecoveryCode],
  synchronize: true, // apenas dev
  ssl: {
    ca: fs.readFileSync(sslCertPath).toString(),
    rejectUnauthorized: true,
  },
});
