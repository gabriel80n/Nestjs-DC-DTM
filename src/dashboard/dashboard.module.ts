import { Module } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { DashboardController } from './dashboard.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Exam } from 'src/database/entities/exam.entity';
import { Patient } from 'src/database/entities/patient.entity';
import { User } from 'src/database/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Exam, Patient, User])],
  controllers: [DashboardController],
  providers: [DashboardService],
})
export class DashboardModule {}
