import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Repository, MoreThan } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { UnauthorizedError } from './errors/unauthorized.error';
import { User } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';
import { UserPayload } from './models/UserPayload';
import { UserToken } from './models/UserResponse';
import { InjectRepository } from '@nestjs/typeorm';
import { PasswordRecoveryCode } from 'src/database/entities/password-recovery-code.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,

    @InjectRepository(PasswordRecoveryCode)
    private readonly recoveryCodeRepo: Repository<PasswordRecoveryCode>,
  ) {}

  async login(user: User): Promise<UserToken> {
    const payload: UserPayload = {
      sub: user.id,
      email: user.email,
      name: user.name,
      type: user.type,
    };

    return {
      id: user.id,
      name: user.name,
      email: user.email,
      type: user.type,
      access_token: this.jwtService.sign(payload),
    };
  }

  async validateUser(email: string, password: string): Promise<User> {
    const user = await this.userService.findByEmail(email);

    if (user) {
      const isPasswordValid = await bcrypt.compare(password, user.password);

      if (isPasswordValid) {
        return {
          ...user,
          password: undefined,
        };
      }
    }

    throw new UnauthorizedError(
      'Email address or password provided is incorrect.',
    );
  }

  async saveCode(userId: number, code: string) {
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000); // 15 minutos

    // Remove códigos antigos para esse usuário
    await this.recoveryCodeRepo.delete({
      user: { id: userId },
    });

    // Cria e salva novo código
    const newRecord = this.recoveryCodeRepo.create({
      code,
      expiresAt,
      user: { id: userId } as User, // só define o id para relacionamento
    });

    await this.recoveryCodeRepo.save(newRecord);
  }

  async validateCode(userId: number, code: string): Promise<boolean> {
    const record = await this.recoveryCodeRepo.findOne({
      where: {
        code,
        expiresAt: MoreThan(new Date()),
        user: { id: userId },
      },
      relations: ['user'],
    });

    if (record) {
      // Remove o código após uso
      await this.recoveryCodeRepo.remove(record);
      return true;
    }

    return false;
  }

  async generateRecoveryCode(): Promise<string> {
    return Math.floor(100000 + Math.random() * 900000).toString();
  }
}
