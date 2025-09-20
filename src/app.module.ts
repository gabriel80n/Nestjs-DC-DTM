import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from './user/user.module';
import { EmailModule } from './email/email.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { PatientModule } from './patient/patient.module';
import { ExamModule } from './exam/exam.module';
import { RolesGuard } from './auth/guards/roles-auth.guard';
import { Exam } from './database/entities/exam.entity';
import { PasswordRecoveryCode } from './database/entities/password-recovery-code.entity';
import { Patient } from './database/entities/patient.entity';
import { User } from './user/entities/user.entity';

import * as fs from 'fs';
import * as path from 'path';

const sslCertPath = path.resolve(__dirname, '../bundle/sa-east-1-bundle.pem');

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT || '5432'),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [User, Patient, Exam, PasswordRecoveryCode],
      synchronize: true,
      autoLoadEntities: true,
      ssl: {
        ca: fs.readFileSync(sslCertPath).toString(),
        rejectUnauthorized: true,
      },
    }),
    UserModule,
    AuthModule,
    EmailModule,
    DashboardModule,
    PatientModule,
    ExamModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    {
      provide: APP_GUARD,
      useClass: RolesGuard,
    },
  ],
})
export class AppModule {}
