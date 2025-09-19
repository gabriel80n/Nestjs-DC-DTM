// exam.dto.ts
import { IsInt, IsOptional, IsObject } from 'class-validator';

export class CreateExamDto {
  @IsInt()
  patientId: number;

  @IsOptional()
  @IsObject()
  answers?: Record<string, any>;
}
