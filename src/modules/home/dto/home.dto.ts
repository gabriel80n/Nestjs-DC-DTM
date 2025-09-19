import { ApiProperty } from "@nestjs/swagger";

export class HomeDto {
  @ApiProperty({
    example: 'Hello World!',
    description: 'The message to be returned by the API'
  })
  message: string;
  
  @ApiProperty({
    example: true,
    description: 'The status of the request'
  })
  success: boolean;

  @ApiProperty({
    example: 'v1',
    description: 'The version of the API'
  })
  version: string;

  @ApiProperty({
    example: 'http://localhost:3000/swagger',
    description: 'The URL for the Swagger documentation'
  })
  swagger: string;
}