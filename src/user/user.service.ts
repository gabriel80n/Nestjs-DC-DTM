import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from 'src/database/entities/user.entity';
import { EmailService } from 'src/email/email.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
    private readonly emailService: EmailService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const generatedPassword = this.generateStrongPassword();
    const hashedPassword = await bcrypt.hash(generatedPassword, 10);

    const newUser = this.userRepo.create({
      email: createUserDto.email,
      name: createUserDto.name,
      password: hashedPassword,
      type: createUserDto.type,
    });

    const savedUser = await this.userRepo.save(newUser);

    await this.emailService.sendGeneratedPassword(
      createUserDto.email,
      generatedPassword,
    );

    // Remove o password antes de retornar
    delete savedUser.password;
    return savedUser;
  }

  async updatePassword(userId: number, hashedPassword: string): Promise<void> {
    await this.userRepo.update(userId, { password: hashedPassword });
  }

  async findByEmail(email: string): Promise<User | null> {
    return await this.userRepo.findOne({ where: { email } });
  }

  async findAll(): Promise<User[]> {
    return await this.userRepo.find();
  }

  async findByNamePrefix(prefix: string): Promise<User[]> {
    return await this.userRepo.find({
      where: {
        name: ILike(`${prefix}%`),
      },
    });
  }

  async deleteUser(id: number): Promise<void> {
    await this.userRepo.delete(id);
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

  async updateMe(userId: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.userRepo.findOne({ where: { id: userId } });

    if (!user) throw new Error('Usuário não encontrado');

    user.name = updateUserDto.name ?? user.name;
    user.email = updateUserDto.email ?? user.email;

    if (updateUserDto.newPassword) {
      user.password = await bcrypt.hash(updateUserDto.newPassword, 10);
    }

    const updatedUser = await this.userRepo.save(user);
    delete updatedUser.password;
    return updatedUser;
  }

  async updateUserType(userId: number, type: string): Promise<User> {
    await this.userRepo.update(userId, { type });
    const updatedUser = await this.userRepo.findOne({ where: { id: userId } });
    if (updatedUser) {
      delete updatedUser.password;
    }
    return updatedUser;
  }
}
