import { BadRequestException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { InteracaoItemRequestDto } from './dto/request.dto';
import { Interacao_Item } from 'src/entity/interacao-item.sql.entity';
import { ResponseSuccessInteracoesDTO } from './dto/response.dto';

@Injectable()
export class InteracaoItemService {
  constructor(
    @InjectRepository(Interacao_Item)
    private readonly interacaoItem: Repository<Interacao_Item>,
  ) {}

  async createInteracao(
    data: InteracaoItemRequestDto,
  ): Promise<ResponseSuccessInteracoesDTO> {
    const interacaoItem = await this.createArrayInteracaoItemRequest(data);
    try {
      return await this.interacaoItem.save(interacaoItem).then(() => {
        return {
          message: 'Interacoes Item retornados com sucesso',
          success: true,
        };
      });
    } catch (error) {
      throw new BadRequestException({
        message: error.message || 'Erro ao criar interacoes item',
        success: false,
      });
    }
  }

  async getById(Id: number): Promise<InteracaoItemRequestDto> {
    return await this.interacaoItem.findOne({
      where: { Id: Id },
    });
  }

  private async createArrayInteracaoItemRequest(
    data: any,
  ): Promise<InteracaoItemRequestDto[]> {
    const interacoesItem = [];

    const Interacao = data.Interacao;
    const Modulo = data.Modulo?.split('|');
    const Item = data.Item?.split('|');
    const Valor = data.Valor?.split('|');
    const Navegate = (data.Navegado_Em || '')?.toString()?.split('|');

    const qtdInteracoes = Navegate?.length || 0;

    for (let i = 0; i < qtdInteracoes; i++) {
      const formattedDateNavegate = new Date(Navegate[i]);

      if (!this.isValidDate(formattedDateNavegate))
        throw new BadRequestException({
          message: 'Data e hora da chamada inválida',
          success: false,
        });

      const interacaoItem: InteracaoItemRequestDto = {
        Interacao: Interacao,
        Modulo: Modulo[i],
        Item: Item[i],
        Valor: Valor[i],
        Navegado_Em: formattedDateNavegate,
      };

      interacoesItem.push(interacaoItem);
    }
    return interacoesItem;
  }

  isValidDate(date: string | Date): boolean {
    const dateObj = new Date(date);
    return dateObj instanceof Date && !isNaN(dateObj.getTime());
  }
}
