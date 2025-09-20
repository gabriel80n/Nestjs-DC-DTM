import { DataSource } from 'typeorm';
import { User } from './entities/user.entity';
import { Patient } from './entities/patient.entity';
import { Exam } from './entities/exam.entity';
import { PasswordRecoveryCode } from './entities/password-recovery-code.entity';

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '5432'),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [User, Patient, Exam, PasswordRecoveryCode],
  synchronize: true, // só para dev. Em prod, use migrations!
});
