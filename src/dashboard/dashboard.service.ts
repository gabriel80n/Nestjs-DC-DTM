import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { IsNull, Not, Repository } from 'typeorm';

import { Patient } from 'src/database/entities/patient.entity';
import { Exam } from 'src/database/entities/exam.entity';
import { User } from 'src/user/entities/user.entity';
import { DashboardStatsDto } from './dto/dashboard-stats.dto';

@Injectable()
export class DashboardService {
  constructor(
    @InjectRepository(Patient)
    private patientRepo: Repository<Patient>,

    @InjectRepository(Exam)
    private examRepo: Repository<Exam>,

    @InjectRepository(User)
    private userRepo: Repository<User>,
  ) {}

  async getStats(): Promise<DashboardStatsDto> {
    const [
      totalPatients,
      totalDiagnostics,
      pendingDiagnostics,
      validatedDiagnostics,
      totalUsers,
    ] = await Promise.all([
      this.patientRepo.count(),
      this.examRepo.count({
        where: {
          result: Not(IsNull()),
        },
      }),
      this.examRepo.count({
        where: {
          validated: IsNull(),
        },
      }),
      this.examRepo.count({
        where: {
          validated: true,
        },
      }),
      this.userRepo.count(),
    ]);

    return {
      totalPatients,
      totalDiagnostics,
      pendingDiagnostics,
      validatedDiagnostics,
      totalUsers,
    };
  }
}
