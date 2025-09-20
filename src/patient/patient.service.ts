// src/patient/patient.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, FindOptionsOrder, ILike } from 'typeorm';

import { CreatePatientDto } from './dto/create-patient.dto';
import { UpdatePatientDto } from './dto/update-patient.dto';
import { Patient } from 'src/database/entities/patient.entity';

@Injectable()
export class PatientService {
  constructor(
    @InjectRepository(Patient)
    private patientRepo: Repository<Patient>,
  ) {}

  async create(createPatientDto: CreatePatientDto): Promise<Patient> {
    const newPatient = this.patientRepo.create({
      ...createPatientDto,
      birthDate: new Date(createPatientDto.birthDate),
    });

    return await this.patientRepo.save(newPatient);
  }

  async deleteById(id: number): Promise<Patient> {
    const patient = await this.patientRepo.findOne({ where: { id } });

    if (!patient) {
      throw new NotFoundException(`Patient with ID ${id} not found`);
    }

    return await this.patientRepo.remove(patient);
  }

  async findAll(): Promise<Patient[]> {
    return await this.patientRepo.find({
      relations: ['exams'], // carrega exames
      order: {
        exams: {
          createdAt: 'DESC',
        },
      } as unknown as FindOptionsOrder<Patient>, // workaround para ordenação nested
    });
  }

  async findByNamePrefix(prefix: string): Promise<Patient[]> {
    return await this.patientRepo.find({
      where: {
        name: ILike(`${prefix}%`),
      },
      relations: ['exams'],
      order: {
        exams: {
          createdAt: 'DESC',
        },
      } as unknown as FindOptionsOrder<Patient>,
    });
  }

  async findById(id: number): Promise<Patient> {
    const patient = await this.patientRepo.findOne({
      where: { id },
      relations: ['exams'],
      order: {
        exams: {
          createdAt: 'DESC',
        },
      } as unknown as FindOptionsOrder<Patient>,
    });

    if (!patient) {
      throw new NotFoundException(`Patient with ID ${id} not found`);
    }

    return patient;
  }

  async update(
    id: number,
    updatePatientDto: UpdatePatientDto,
  ): Promise<Patient> {
    await this.patientRepo.update(id, updatePatientDto);
    return this.findById(id);
  }

  async deleteAll(): Promise<void> {
    await this.patientRepo.clear(); // limpa toda a tabela
  }
}
