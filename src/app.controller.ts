import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { CurrentUser } from './auth/decorators/current-user.decorator';
import { User } from './user/entities/user.entity';
import { AppDataSource } from './database/data_source';
import { IsPublic } from './auth/decorators/is-public.decorator';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/me')
  getMe(@CurrentUser() currentUser: User) {
    return currentUser;
  }

  @IsPublic()
  @Get('/init-db')
  async initDb() {
    try {
      if (!AppDataSource.isInitialized) {
        await AppDataSource.initialize();
        await AppDataSource.synchronize(); // cria as tabelas
        return { message: 'Banco de dados inicializado com sucesso.' };
      } else {
        return { message: 'Banco de dados já está inicializado.' };
      }
    } catch (error) {
      console.error(error);
      return {
        error: 'Erro ao inicializar o banco de dados',
        details: error.message,
      };
    }
  }
}
