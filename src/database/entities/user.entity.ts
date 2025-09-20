import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { Exam } from './exam.entity';
import { PasswordRecoveryCode } from './password-recovery-code.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  name: string;

  @Column()
  type: string;

  @Column({ default: true })
  firstLogin: boolean;

  @CreateDateColumn()
  createdAt: Date;

  @OneToMany(() => Exam, (exam) => exam.user)
  exams: Exam[];

  @OneToMany(() => Exam, (exam) => exam.validator)
  validations: Exam[];

  @OneToMany(() => PasswordRecoveryCode, (prc) => prc.user)
  recoveryCodes: PasswordRecoveryCode[];
}
