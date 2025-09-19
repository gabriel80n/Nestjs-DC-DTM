import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Request } from 'express';
import { HomeDto } from 'src/modules/home/dto/home.dto';
import { Public } from 'nest-keycloak-connect';

@ApiTags('Home')
@ApiBearerAuth()
@Controller('/')
export class HomeController {
  constructor() {}

  @Get()
  @Public()
  @ApiResponse({
    status: 200,
    description: 'Retorna a mensagem de boas-vindas da API',
    type: HomeDto,
  })
  @ApiOperation({
    summary: 'Página inicial da API',
    description:
      'Página inicial da API, que retorna uma mensagem de boas-vindas e algumas informações sobre a API.',
  })
  getHome(@Req() req: Request): HomeDto {
    return {
      message: 'NestJS API',
      success: true,
      version: process.env.npm_package_version || 'v1',
      swagger:
        `${req.protocol}://` +
        `${req.get('host')}/${process.env.BASE_PATH ? process.env.BASE_PATH + '/' : ''}${process.env.SWAGGER_PATH}`.replace(
          /\/\//g,
          '/',
        ),
    };
  }

  @Get('home')
  @Public()
  @ApiResponse({
    status: 200,
    description: 'Retorna a mensagem de boas-vindas da API',
    type: HomeDto,
  })
  @ApiOperation({
    summary: 'Página inicial da API',
    description:
      'Página inicial da API, que retorna uma mensagem de boas-vindas e algumas informações sobre a API.',
  })
  getHome2(@Req() req: Request): HomeDto {
    return {
      message: 'NestJS API',
      success: true,
      version: process.env.npm_package_version || 'v1',
      swagger:
        `${req.protocol}://` +
        `${req.get('host')}/${process.env.BASE_PATH ? process.env.BASE_PATH + '/' : ''}${process.env.SWAGGER_PATH}`.replace(
          /\/\//g,
          '/',
        ),
    };
  }
}
