import { IsString, Matches, IsEmail } from 'class-validator';

export class UpdateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  code: string;

  @IsString()
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d|.*\W).{8,20}$/, {
    message:
      'Senha fraca, deve conter de 8 a 20 caracteres, símbolos, letras maiúsculas e minúsculas.',
  })
  newPassword: string;
}
