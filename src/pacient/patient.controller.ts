// src/paciente/paciente.controller.ts

import {
  Controller,
  Get,
  Post,
  Body,
  Delete,
  Param,
  Query,
  Put,
} from '@nestjs/common';

import { CreatePatientDto } from './dto/create-patient.dto';
import { PatientService } from './patient.service';
import { IsPublic } from 'src/auth/decorators/is-public.decorator';
import { UpdatePatientDto } from './dto/update-patient.dto';

@Controller('patients')
export class PatientController {
  constructor(private readonly patientService: PatientService) {}

  @IsPublic()
  @Post()
  async create(@Body() createPacientDto: CreatePatientDto) {
    return this.patientService.create(createPacientDto);
  }

  @IsPublic()
  @Delete(':id')
  async deletePatient(@Param('id') id: number) {
    await this.patientService.deleteById(id);
  }
  @Get()
  async findAll() {
    return this.patientService.findAll();
  }
  @Get('search')
  async findByNamePrefix(@Query('name') name: string) {
    return this.patientService.findByNamePrefix(name);
  }
  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.patientService.findById(Number(id));
  }
  // src/paciente/paciente.controller.ts

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() updatePatientDto: UpdatePatientDto,
  ) {
    return this.patientService.update(id, updatePatientDto);
  }
}
