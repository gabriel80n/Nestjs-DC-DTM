// src/email/email.service.ts
import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class EmailService {
  private transporter;

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

    await this.transporter.sendMail({
      from: `"DC/DTM App" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: 'Código para redefinição de senha',
      html,
    });
  }
}
