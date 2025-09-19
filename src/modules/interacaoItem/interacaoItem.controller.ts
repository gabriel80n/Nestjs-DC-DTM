import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Roles } from 'nest-keycloak-connect';
import { InteracaoItemRequestDto } from './dto/request.dto';
import { ResponseSuccessInteracoesDTO } from './dto/response.dto';
import { InteracaoItemService } from './interacaoItem.service';

@ApiTags('Interacao Item')
@ApiBearerAuth()
@Controller('interacao-item')
export class InteracaoItemController {
  constructor(private interacaoItemService: InteracaoItemService) {}

  @Post('create')
  // @Roles({ roles: ['admin'] })
  @ApiOperation({
    summary: 'Requisição de API',
    description: 'Gravar uma nova interacao na tabela',
  })
  @ApiResponse({
    status: 201,
    description: 'Interacao criada com sucesso',
    type: ResponseSuccessInteracoesDTO,
  })
  createLogNavigation(
    @Body() data: InteracaoItemRequestDto,
  ): Promise<ResponseSuccessInteracoesDTO> {
    return this.interacaoItemService.createInteracao(data);
  }

  @Get('get-by-id')
  @ApiBearerAuth()
  @ApiOperation({
    summary: 'Requisição de API',
    description: 'Buscar a interacao item via id',
  })
  getById(@Query('Id') Id: number) {
    return this.interacaoItemService.getById(Id);
  }

}
