import { Interacao } from 'src/entity/interacao.sql.entity';
import { InteracaoController } from './interacao.controller';
import { InteracaoService } from './interacao.service';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  providers: [InteracaoService],
  controllers: [InteracaoController],
  imports: [TypeOrmModule.forFeature([Interacao])],
})
export class InteracaoModule {}
