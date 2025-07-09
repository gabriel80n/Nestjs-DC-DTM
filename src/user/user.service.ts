import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { EmailService } from 'src/email/email.service';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly emailService: EmailService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    try {
      const generatedPassword = this.generateStrongPassword();
      const hashedPassword = await bcrypt.hash(generatedPassword, 10);

      const data = {
        email: createUserDto.email,
        name: createUserDto.name,
        password: hashedPassword,
        type: createUserDto.type,
      };

      const createdUser = await this.prisma.user.create({ data });

      await this.emailService.sendGeneratedPassword(
        createUserDto.email,
        generatedPassword,
      );

      return {
        ...createdUser,
        password: undefined,
      };
    } catch (error) {
      console.error('Erro ao criar usuário:', error);
      throw error;
    }
  }

  async updatePassword(userId: number, hashedPassword: string): Promise<void> {
    await this.prisma.user.update({
      where: { id: userId },
      data: { password: hashedPassword },
    });
  }

  findByEmail(email: string) {
    return this.prisma.user.findUnique({ where: { email } });
  }

  async findAll() {
    return await this.prisma.user.findMany();
  }

  async findByNamePrefix(prefix: string) {
    return await this.prisma.user.findMany({
      where: {
        name: {
          startsWith: prefix,
        },
      },
    });
  }

  async deleteUser(id: number): Promise<void> {
    await this.prisma.user.delete({
      where: { id },
    });
  }

  generateStrongPassword(length = 12): string {
    const charset =
      'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+~';
    let password = '';
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      password += charset[randomIndex];
    }
    return password;
  }

  // src/user/user.service.ts
  async updateMe(userId: number, updateUserDto: UpdateUserDto): Promise<User> {
    const updateData: any = {
      name: updateUserDto.name,
      email: updateUserDto.email,
    };

    if (updateUserDto.newPassword) {
      updateData.password = await bcrypt.hash(updateUserDto.newPassword, 10);
    }

    const updatedUser = await this.prisma.user.update({
      where: { id: userId },
      data: updateData,
    });

    return {
      ...updatedUser,
      password: undefined,
    };
  }
}
