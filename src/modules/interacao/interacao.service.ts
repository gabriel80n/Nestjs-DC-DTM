import { BadRequestException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { InteracaoRequestDto, UpdateRequestDto } from './dto/request.dto';
import { Interacao } from 'src/entity/interacao.sql.entity';
import { ResponseSuccessInteracoesDTO } from './dto/response.dto';

@Injectable()
export class InteracaoService {
  constructor(
    @InjectRepository(Interacao)
    private readonly interacao: Repository<Interacao>,
  ) {}

  async createSingleInteracao(
    data: InteracaoRequestDto,
  ): Promise<ResponseSuccessInteracoesDTO> {
    try {
      // Criar uma nova instância de Interacao com base no DTO
      const interacao = this.interacao.create({
        URA: data.URA,
        Genesys_UUID: data.Genesys_UUID,
        GVP_Guid: data.GVP_Guid,
        ANI: data.ANI,
        DNIS: data.DNIS,
        Call_UUID: data.Call_UUID,
        Inicio: new Date(data.Inicio),
        Termino: new Date(data.Termino),
        Criado_Em: new Date(data.Criado_Em),
      });

      // Salvar a interação no banco de dados
      await this.interacao.save(interacao);

      return {
        message: 'Interação criada com sucesso!',
        success: true,
      };
    } catch (error) {
      throw new BadRequestException({
        message: error.message || 'Erro ao criar interação',
        success: false,
      });
    }
  
  }

  async update(
    update: UpdateRequestDto,
  ): Promise<ResponseSuccessInteracoesDTO> {
    try {
      let interacao = await this.interacao.findOne({
        where: { Genesys_UUID: update.Genesys_UUID },
      });
      if (!interacao) {
        throw new BadRequestException({
          message: 'Erro ao atualizar interacao',
          success: false,
        });
      }
      const formattedDateTermino = new Date(update.Termino);

      if (!this.isValidDate(formattedDateTermino))
        throw new BadRequestException({
          message: 'Data e hora da chamada inválida',
          success: false,
        });
      interacao.Termino = formattedDateTermino;
      interacao.Call_UUID = update.Call_UUID;
      interacao.Participant_Id = update.Participant_Id;

      await this.interacao.save(interacao);
      return {
        message: 'Termino atualizado com sucesso',
        success: true,
      };
    } catch (error) {
      throw new BadRequestException({
        message: error.message || 'Erro ao atualizar termino',
        success: false,
      });
    }
  }

  async getByGenesysUUID(Genesys_UUID: string): Promise<InteracaoRequestDto> {
    let data = await this.interacao.findOne({
      where: { Genesys_UUID: Genesys_UUID },
    });
    return data;
  }

  async getInteracaoRequest(): Promise<InteracaoRequestDto[]> {
    return await this.interacao.createQueryBuilder('item').take(10).getMany();
  }

  private async createArrayInteracaoRequest(
    data: any,
  ): Promise<InteracaoRequestDto[]> {
    const interacoes = [];

    const Call_UUID = data.Call_UUID;
    const Genesys_UUID = data.Genesys_UUID;
    const URA = data.URA?.split('|');
    const GVP_Guid = data.GVP_Guid?.split('|');
    const ANI = data.ANI?.split('|');
    const DNIS = data.DNIS?.split('|');
    const Criado_Em = (data.Criado_Em || '')?.toString()?.split('|');
    const Inicio = (data.Inicio || '')?.toString()?.split('|');
    const Termino = (data.Termino || '')?.toString();

    const qtdInteracoes = Criado_Em?.length || 0;
    const formattedDateTermino = new Date(Termino);

    for (let i = 0; i < qtdInteracoes; i++) {
      const formattedDateCreate = new Date(Criado_Em[i]);
      const formattedDateInicio = new Date(Inicio[i]);

      if (!this.isValidDate(formattedDateCreate))
        throw new BadRequestException({
          message: 'Data e hora da chamada inválida',
          success: false,
        });

      const interacao: InteracaoRequestDto = {
        Call_UUID: Call_UUID,
        URA: URA[i],
        Genesys_UUID: Genesys_UUID,
        GVP_Guid: GVP_Guid[i],
        ANI: ANI[i],
        DNIS: DNIS[i],
        Criado_Em: formattedDateCreate,
        Inicio: formattedDateInicio,
        Termino: formattedDateTermino,
      };

      interacoes.push(interacao);
    }
    return interacoes;
  }

  isValidDate(date: string | Date): boolean {
    const dateObj = new Date(date);
    return dateObj instanceof Date && !isNaN(dateObj.getTime());
  }
}
