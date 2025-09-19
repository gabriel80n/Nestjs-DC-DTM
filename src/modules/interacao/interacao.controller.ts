import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiQuery,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Roles } from 'nest-keycloak-connect';
import { InteracaoRequestDto, UpdateRequestDto } from './dto/request.dto';
import { ResponseSuccessInteracoesDTO } from './dto/response.dto';
import { InteracaoService } from './interacao.service';

@ApiTags('Interacao')
@ApiBearerAuth()
@Controller('interacao')
export class InteracaoController {
  constructor(private interacaoService: InteracaoService) {}

  @Post('create')
  @ApiOperation({
    summary: 'Criar uma nova interação',
    description: 'Este método cria uma única interação no banco de dados.',
  })
  @ApiResponse({
    status: 201,
    description: 'Interação criada com sucesso',
    type: ResponseSuccessInteracoesDTO,
  })
  async createInteracao(
    @Body() data: InteracaoRequestDto,
  ): Promise<ResponseSuccessInteracoesDTO> {
    return this.interacaoService.createSingleInteracao(data);
  }

  @Get('get20')
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Requisição de API',
    description: 'Retorna a lista de interacao',
  })
  getLogs() {
    return this.interacaoService.getInteracaoRequest();
  }

  @Get('get-by-genesys-uuid')
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Requisição de API',
    description: 'Buscar a interacao via Genesys_UUID',
  })
  @ApiQuery({
    name: 'Genesys_UUID',
    required: true,
    description: 'Genesys_UUID',
  })
  getByGenesysUUID(@Query('Genesys_UUID') Genesys_UUID?: string) {
    return this.interacaoService.getByGenesysUUID(Genesys_UUID);
  }

  @Put('update')
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Requisição de API',
    description: 'Ataulizar o campo termino',
  })
  update(
    @Body() updateTerminoDto: UpdateRequestDto,
  ): Promise<ResponseSuccessInteracoesDTO> {
    return this.interacaoService.update(updateTerminoDto);
  }
}
