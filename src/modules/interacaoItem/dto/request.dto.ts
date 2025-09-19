import { IsNotEmpty, MaxLength } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class InteracaoItemRequestDto {
  @ApiProperty({
    required: true,
    description: 'Interacao',
    example: 1,
  })
  @IsNotEmpty({ message: 'Interacao da chamada é obrigatório' })
  Interacao: number;

  @ApiProperty({
    required: true,
    description: 'Modulo',
    example: '1267|1267|1267',
  })
  @IsNotEmpty({ message: 'Modulo da chamada é obrigatório' })
  Modulo: number;

  @ApiProperty({
    required: true,
    description: 'Item',
    example: '694|695|697',
  })
  @IsNotEmpty({ message: 'Item da chamada é obrigatório' })
  Item: number;

  @ApiProperty({
    required: true,
    description: 'Valor',
    example: 'Áudio Pergunta 2 OP4_5|Áudio Pergunta 3 OP4_5|1',
    maxLength: 255,
  })
  @IsNotEmpty({ message: 'Valor é obrigatório' })
  @MaxLength(255, { message: 'Valor deve ter no máximo 255 caracteres' })
  Valor: string;

  @ApiProperty({
    required: true,
    description:
      'Data e hora da chamada (YYYY-MM-DD HH:mm:ss) ou (YYYY-MM-DDTHH:mm:ss.sssZ)',
    example: '2024-04-19T11:25:25.669Z|2023-02-09 01:11:56.307',
  })
  @IsNotEmpty({ message: 'Data e hora da chamada é obrigatório' })
  Navegado_Em: string | Date;
}
