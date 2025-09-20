import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';
import { Patient } from './patient.entity';
import { User } from './user.entity';

@Entity()
export class Exam {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  patientId: number;

  @Column()
  userId: number;

  @Column({ default: 'in_progress' })
  status: string;

  @Column({ type: 'json', nullable: true })
  result: any;

  @Column({ nullable: true })
  observations: string;

  @Column({ nullable: true })
  validated: boolean;

  @Column({ nullable: true })
  validatorId: number;

  @Column({ type: 'timestamp', nullable: true })
  validatedAt: Date;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ type: 'json', nullable: true })
  answers: any;

  @Column({ type: 'json', nullable: true })
  validationChanges: any;

  @ManyToOne(() => Patient, (patient) => patient.exams, {
    onDelete: 'SET NULL',
    nullable: true,
  })
  patient: Patient;

  @ManyToOne(() => User, (user) => user.exams)
  user: User;

  @ManyToOne(() => User, (user) => user.validations, { nullable: true })
  validator: User;
}
