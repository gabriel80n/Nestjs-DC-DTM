import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({
  name: 'Interacao_Item',
})
export class Interacao_Item {
  @PrimaryGeneratedColumn()
  Id: number;

  @Column({ type: 'bigint' })
  Interacao: number;

  @Column({ type: 'int' })
  Modulo: number;

  @Column({ type: 'int' })
  Item: number;

  @Column({ type: 'varchar', nullable: true, length: 255 })
  Valor: string;

  @Column({ type: 'datetime', nullable: false })
  Navegado_Em: Date | string;

  @Column({ type: 'datetime', nullable: false })
  Criado_Em: Date | string;
}
