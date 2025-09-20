// src/paciente/dto/update-patient.dto.ts

import { Type } from 'class-transformer';
import { IsString, IsOptional, IsDate, IsNumber } from 'class-validator';

export class UpdatePatientDto {
  @IsString() @IsOptional() name?: string;
  @IsString() @IsOptional() document?: string;
  @IsString() @IsOptional() documentType?: string;
  @Type(() => Date)
  @IsDate()
  @IsOptional()
  birthDate?: Date;
  @IsString() @IsOptional() phone?: string;
  @IsString() @IsOptional() address?: string;
  @IsString() @IsOptional() gender?: string;
  @IsString() @IsOptional() race?: string;
  @IsString() @IsOptional() maritalStatus?: string;
  @IsString() @IsOptional() educationLevel?: string;
  @IsString() @IsOptional() origin?: string;
  @IsNumber() @IsOptional() annualIncome?: number;
  @Type(() => Date)
  @IsDate()
  @IsOptional()
  createdAt?: Date;
}
