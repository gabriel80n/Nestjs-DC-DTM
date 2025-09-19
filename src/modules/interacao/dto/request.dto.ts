import { IsNotEmpty, IsOptional, MaxLength } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class InteracaoRequestDto {
  @ApiProperty({
    required: true,
    description: 'URA',
    example: 1,
  })
  @IsNotEmpty({ message: 'URA da chamada é obrigatório' })
  URA: number;

  @ApiProperty({
    required: true,
    description: 'Genesys_UUID',
    example: '12345678-9123-4567-8912-345678912345',
    maxLength: 50,
  })
  @IsNotEmpty({ message: 'Genesys_UUID é obrigatório' })
  @MaxLength(50, { message: 'Genesys_UUID deve ter no máximo 50 caracteres' })
  Genesys_UUID: string;

  @ApiProperty({
    required: true,
    description: 'GVP_Guid',
    example: '12345678-9123-4567-8912-345678912345',
    maxLength: 16,
  })
  @IsNotEmpty({ message: 'GVP_Guid é obrigatório' })
  GVP_Guid: string;

  @ApiProperty({
    required: true,
    description: 'ANI',
    example: 1,
  })
  @IsNotEmpty({ message: 'ANI da chamada é obrigatório' })
  ANI: number;

  @ApiProperty({
    required: true,
    description: 'DNIS',
    example: 1,
  })
  @IsNotEmpty({ message: 'DNIS da chamada é obrigatório' })
  DNIS: number;

  @ApiProperty({
    required: true,
    description: 'UUID da chamada',
    example: '12345678-9123-4567-8912-345678912345',
    maxLength: 36,
  })
  @IsNotEmpty({ message: 'UUID da chamada é obrigatório' })
  @MaxLength(36, {
    message: 'UUID da chamada deve ter no máximo 36 caracteres',
  })
  Call_UUID: string;

  @ApiProperty({
    required: true,
    description:
      'Data e hora da chamada (YYYY-MM-DD HH:mm:ss) ou (YYYY-MM-DDTHH:mm:ss.sssZ)',
    example: '2024-04-19T11:25:25.669Z|2023-02-09 01:11:56.307',
  })
  @IsNotEmpty({ message: 'Data e hora da chamada é obrigatório' })
  Inicio: string | Date;

  @ApiProperty({
    required: true,
    description:
      'Data e hora da chamada (YYYY-MM-DD HH:mm:ss) ou (YYYY-MM-DDTHH:mm:ss.sssZ)',
    example: '2024-04-19T11:25:25.669Z',
  })
  @IsNotEmpty({ message: 'Data e hora da chamada é obrigatório' })
  Termino: string | Date;

  @ApiProperty({
    required: true,
    description:
      'Data e hora da chamada (YYYY-MM-DD HH:mm:ss) ou (YYYY-MM-DDTHH:mm:ss.sssZ)',
    example: '2024-04-19T11:25:25.669Z|2023-02-09 01:11:56.307',
  })
  @IsNotEmpty({ message: 'Data e hora da chamada é obrigatório' })
  Criado_Em: string | Date;
}

export class UpdateRequestDto {
  @ApiProperty({
    required: true,
    description:
      'Data e hora da chamada (YYYY-MM-DD HH:mm:ss) ou (YYYY-MM-DDTHH:mm:ss.sssZ)',
    example: '2024-04-19T11:25:25.669Z|2023-02-09 01:11:56.307',
  })
  @IsNotEmpty({ message: 'Data e hora da chamada é obrigatório' })
  Termino: string | Date;

  @ApiProperty({
    required: true,
    description: 'UUID da chamada',
    example: '12345678-9123-4567-8912-345678912345',
    maxLength: 36,
  })
  @IsNotEmpty({ message: 'UUID da chamada é obrigatório' })
  @MaxLength(36, {
    message: 'UUID da chamada deve ter no máximo 36 caracteres',
  })
  Call_UUID: string;

  @ApiProperty({
    required: true,
    description: 'UUID da chamada',
    example: '12345678-9123-4567-8912-345678912345',
    maxLength: 36,
  })
  @IsNotEmpty({ message: 'UUID da chamada é obrigatório' })
  @MaxLength(36, {
    message: 'UUID da chamada deve ter no máximo 36 caracteres',
  })
  Participant_Id: string;

  @ApiProperty({
    required: true,
    description: 'UUID da chamada',
    example: '12345678-9123-4567-8912-345678912345',
    maxLength: 36,
  })
  @IsNotEmpty({ message: 'UUID da chamada é obrigatório' })
  @MaxLength(50, {
    message: 'UUID da chamada deve ter no máximo 50 caracteres',
  })
  Genesys_UUID: string;
}
