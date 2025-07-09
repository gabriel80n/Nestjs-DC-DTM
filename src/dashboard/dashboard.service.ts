// src/dashboard/dashboard.service.ts
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { DashboardStatsDto } from './dto/dashboard-stats.dto';

@Injectable()
export class DashboardService {
  constructor(private prisma: PrismaService) {}

  async getStats(): Promise<DashboardStatsDto> {
    const [
      totalPacients,
      totalDiagnostics,
      pendingDiagnostics,
      validatedDiagnostics,
      totalUsers,
    ] = await Promise.all([
      this.prisma.patient.count(),
      this.prisma.exam.count({
        where: {
          result: { not: null },
        },
      }),
      this.prisma.exam.count({
        where: {
          validated: null,
        },
      }),
      this.prisma.exam.count({
        where: {
          validated: true,
        },
      }),
      this.prisma.user.count(),
    ]);

    return {
      totalPacients,
      totalDiagnostics,
      pendingDiagnostics,
      validatedDiagnostics,
      totalUsers,
    };
  }
}
