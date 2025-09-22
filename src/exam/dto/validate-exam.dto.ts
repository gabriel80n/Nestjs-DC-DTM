// src/exam/dto/validate-exam.dto.ts
import { IsOptional, IsObject } from 'class-validator';

export class ValidateExamDto {
  @IsOptional()
  @IsObject()
  answers?: Record<string, string | null | undefined>;
}
