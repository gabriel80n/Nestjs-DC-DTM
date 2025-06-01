import {
  BadRequestException,
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  NotFoundException,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthRequest } from './models/AuthRequest';
import { IsPublic } from './decorators/is-public.decorator';
import { EmailService } from 'src/email/email.service';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from 'src/user/dto/update-user.dto';

@Controller()
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly emailService: EmailService,
    private readonly userService: UserService,
  ) {}

  @IsPublic()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Request() req: AuthRequest) {
    return this.authService.login(req.user);
  }
  @IsPublic()
  @Post('forgot-password')
  async forgotPassword(@Body() body: { email: string }) {
    const user = await this.userService.findByEmail(body.email);
    if (!user) throw new NotFoundException('Usuário não encontrado');

    const code = await this.authService.generateRecoveryCode();
    await this.authService.saveCode(user.id, code.toString());

    await this.emailService.sendCode(user.email, code.toString());

    return { message: 'Código enviado para seu e-mail' };
  }
  @IsPublic()
  @Post('reset-password')
  async resetPassword(@Body() updateUserDto: UpdateUserDto) {
    const user = await this.userService.findByEmail(updateUserDto.email);
    if (!user) throw new NotFoundException('Usuário não encontrado');

    const valid = await this.authService.validateCode(
      user.id,
      updateUserDto.code,
    );
    if (!valid) throw new BadRequestException('Código inválido ou expirado');

    const hashedPassword = await bcrypt.hash(updateUserDto.newPassword, 10);
    await this.userService.updatePassword(user.id, hashedPassword);

    return { message: 'Senha alterada com sucesso' };
  }
}
