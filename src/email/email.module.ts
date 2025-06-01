// src/email/email.module.ts

import { Module } from '@nestjs/common';
import { EmailService } from './email.service';

@Module({
  controllers: [],
  providers: [EmailService],
  exports: [EmailService], // caso você queira usar em outro módulo como auth
})
export class EmailModule {}
