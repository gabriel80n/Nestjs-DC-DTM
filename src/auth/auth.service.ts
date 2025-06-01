import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UnauthorizedError } from './errors/unauthorized.error';
import { User } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';
import { UserPayload } from './models/UserPayload';
import { UserToken } from './models/UserResponse';
import { PrismaService } from 'src/prisma/prisma.service';

interface RecoveryRecord {
  userId: string;
  code: string;
  expiresAt: Date;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    private readonly prismaService: PrismaService,
  ) {}

  async login(user: User): Promise<UserToken> {
    const payload: UserPayload = {
      sub: user.id,
      email: user.email,
      name: user.name,
    };

    return {
      id: user.id,
      name: user.name,
      email: user.email,
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

  private codes: RecoveryRecord[] = [];

  async saveCode(userId: number, code: string) {
    const expiresAt = new Date(Date.now() + 15 * 60 * 1000); // 15 minutos daqui

    // Remove código antigo do usuário, se houver
    await this.prismaService.passwordRecoveryCode.deleteMany({
      where: { userId },
    });

    // Insere novo código
    await this.prismaService.passwordRecoveryCode.create({
      data: {
        userId,
        code,
        expiresAt,
      },
    });
  }

  async validateCode(userId: number, code: string): Promise<boolean> {
    const record = await this.prismaService.passwordRecoveryCode.findFirst({
      where: {
        userId,
        code,
        expiresAt: { gt: new Date() }, // Só códigos válidos
      },
    });

    if (record) {
      // Deleta o código após uso
      await this.prismaService.passwordRecoveryCode.delete({
        where: { id: record.id },
      });
      return true;
    }
    return false;
  }

  async generateRecoveryCode() {
    // Gera número aleatório entre 100000 e 999999 (6 dígitos)
    return Math.floor(100000 + Math.random() * 900000).toString();
  }
}
