// src/user/dto/update-user-type.dto.ts
import { IsEnum } from 'class-validator';

export enum UserType {
  USER = 'user',
  ADMIN = 'admin',
  VALIDATOR = 'validator',
}

export class UpdateUserTypeDto {
  @IsEnum(UserType)
  type: UserType;
}
