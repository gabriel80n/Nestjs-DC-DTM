import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class PasswordRecoveryCode {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  code: string;

  @Column()
  expiresAt: Date;

  @ManyToOne(() => User, (user) => user.recoveryCodes, { onDelete: 'CASCADE' })
  user: User;
}
