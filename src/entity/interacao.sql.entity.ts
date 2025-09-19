import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({
  name: 'Interacao'
})
export class Interacao {
  @PrimaryGeneratedColumn()
  id: number;
  
  @Column({ type: 'int'})
  URA: number;
  
  @Column({ type: 'varchar', nullable: true, length: 50})
  Genesys_UUID: string;

  @Column({ type: 'uniqueidentifier', nullable: true})
  GVP_Guid: string;
  
  @Column({ type: 'bigint'})
  ANI: number;

  @Column({ type: 'bigint'})
  DNIS: number;

  @Column({ type: 'varchar', nullable: true, length: 36})
  Participant_Id: string;

  @Column({ type: 'varchar', nullable: true, length: 36})
  Call_UUID: string;

  @Column({ type: 'datetime', nullable: false})
  Inicio: Date | string;
  
  @Column({ type: 'datetime', nullable: true})
  Termino: Date | string;

  @Column({ type: 'datetime', nullable: false})
  Criado_Em: Date | string;
}