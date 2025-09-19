// {
//   "message": "Token not found",
//   "error": "Unauthorized",
//   "statusCode": 401
// }

import { ApiProperty } from "@nestjs/swagger";

export class ResponseUnauthorizedAuthDto {
  @ApiProperty({
    example: 'Token not found',
    description: 'Mensagem de erro',
  })
  message: string;

  @ApiProperty({
    example: 401,
    description: 'Código do erro',
  })
  statusCode: number;
}