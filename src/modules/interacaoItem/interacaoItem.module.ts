import { InteracaoItemController } from './interacaoItem.controller';
import { InteracaoItemService } from './interacaoItem.service';
import { Interacao_Item } from 'src/entity/interacao-item.sql.entity';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  providers: [InteracaoItemService],
  controllers: [InteracaoItemController],
  imports: [TypeOrmModule.forFeature([Interacao_Item])],
})
export class InteracaoItemModule {}
