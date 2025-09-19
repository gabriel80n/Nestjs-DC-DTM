import { ApiProperty } from "@nestjs/swagger";

export class ResponseSuccessInteracoesDTO {
  @ApiProperty({
    description: 'Mensagem com o resultado da operação',
    example: 'Interacoes retornadas com sucesso'
  })
  message: string;

  @ApiProperty({
    description: 'Valor booleano que indica se a operação foi bem sucedida',
    example: true
  })
  success: boolean;
}

export class ResponseFailedLogsDTO {
  @ApiProperty({
    description: 'Mensagem com o resultado da operação',
    example: 'Erro ao retornar logs'
  })
  message: string;

  @ApiProperty({
    description: 'Valor booleano que indica se a operação foi bem sucedida',
    example: false
  })
  success: boolean;
}