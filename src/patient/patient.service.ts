// src/paciente/paciente.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';

@Injectable()
export class PatientService {
  constructor(private prisma: PrismaService) {}

  async create(createPatientDto: CreatePatientDto) {
    const {
      name,
      document,
      documentType,
      birthDate,
      phone,
      address,
      gender,
      race,
      maritalStatus,
      educationLevel,
      origin,
      annualIncome,
    } = createPatientDto;

    return await this.prisma.patient.create({
      data: {
        name,
        document,
        documentType,
        birthDate: new Date(birthDate),
        phone,
        address,
        gender,
        race,
        maritalStatus,
        educationLevel,
        origin,
        annualIncome,
      },
    });
  }
  async deleteById(id: number) {
    const patient = await this.prisma.patient.findUnique({
      where: { id },
    });

    if (!patient) {
      throw new NotFoundException(`Patient with ID ${id} not found`);
    }

    return await this.prisma.patient.delete({
      where: { id },
    });
  }

  // src/paciente/paciente.service.ts

  async findAll() {
    return await this.prisma.patient.findMany({
      include: {
        exams: {
          orderBy: {
            createdAt: 'desc', // <- mais recente primeiro
          },
        },
      },
    });
  }

  // src/paciente/paciente.service.ts

  async findByNamePrefix(prefix: string) {
    return await this.prisma.patient.findMany({
      where: {
        name: {
          startsWith: prefix,
        },
      },
      include: {
        exams: {
          orderBy: {
            createdAt: 'desc', // <- mais recente primeiro
          },
        },
      },
    });
  }

  async findById(id: number) {
    const patient = await this.prisma.patient.findUnique({
      where: { id },
      include: {
        exams: {
          orderBy: {
            createdAt: 'desc', // <- mais recente primeiro
          },
        },
      },
    });

    if (!patient) {
      throw new NotFoundException(`Patient with ID ${id} not found`);
    }

    return patient;
  }
  // src/paciente/paciente.service.ts

  async update(id: number, updatePatientDto: UpdatePatientDto) {
    const patient = await this.prisma.patient.update({
      where: { id },
      data: updatePatientDto,
    });
    return patient;
  }

  async deleteAll() {
    return this.prisma.patient.deleteMany({});
  }
}
