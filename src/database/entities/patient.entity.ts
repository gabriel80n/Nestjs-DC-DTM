import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { Exam } from './exam.entity';

@Entity()
export class Patient {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  document: string;

  @Column()
  documentType: string;

  @Column()
  birthDate: Date;

  @Column()
  phone: string;

  @Column()
  address: string;

  @Column()
  gender: string;

  @Column()
  race: string;

  @Column()
  maritalStatus: string;

  @Column()
  educationLevel: string;

  @Column()
  origin: string;

  @Column('float')
  annualIncome: number;

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => Exam, (exam) => exam.patient)
  exams: Exam[];
}
