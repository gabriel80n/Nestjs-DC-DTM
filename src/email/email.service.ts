import {
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private transporter;
  private readonly logger = new Logger(EmailService.name);

  constructor() {
    this.transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });
  }

  async sendCode(email: string, code: string) {
    const html = `
      <p>Olá!</p>
      <p>Seu código para redefinir a senha é: <b>${code}</b></p>
      <p>Esse código é válido por 15 minutos.</p>
    `;

    try {
      await this.transporter.sendMail({
        from: `"DC/DTM App" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: 'Código para redefinição de senha',
        html,
      });
    } catch (error) {
      this.logger.error(`Erro ao enviar e-mail para ${email}`, error.stack);
      throw new InternalServerErrorException(
        'Não foi possível enviar o e-mail de código.',
      );
    }
  }

  async sendGeneratedPassword(email: string, password: string) {
    const html = `
      <p>Olá!</p>
      <p>Sua conta foi criada no sistema DC/DTM.</p>
      <p>Sua senha temporária é: <b>${password}</b></p>
      <p>Por favor, altere-a após o primeiro login.</p>
    `;

    try {
      await this.transporter.sendMail({
        from: `"DC/DTM App" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: 'Sua senha de acesso - DC/DTM',
        html,
      });
    } catch (error) {
      this.logger.error(`Erro ao enviar senha para ${email}`, error.stack);
      throw new InternalServerErrorException(
        'Não foi possível enviar o e-mail com a senha.',
      );
    }
  }
}
