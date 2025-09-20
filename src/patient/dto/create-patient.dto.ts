// src/paciente/dto/create-patient.dto.ts

import { IsString, IsDateString, IsNumber } from 'class-validator';

export class CreatePatientDto {
  @IsString()
  name: string;

  @IsString()
  document: string;

  @IsString()
  documentType: string;

  @IsDateString()
  birthDate: string;

  @IsString()
  phone: string;

  @IsString()
  address: string;

  @IsString()
  gender: string;

  @IsString()
  race: string;

  @IsString()
  maritalStatus: string;

  @IsString()
  educationLevel: string;

  @IsString()
  origin: string;

  @IsNumber()
  annualIncome: number;
}
