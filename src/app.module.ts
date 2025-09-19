import { BadRequestException, Module, ValidationPipe } from '@nestjs/common';

import { APP_PIPE } from '@nestjs/core';
import { DatabaseModule } from './database/database.module';
import { HomeModule } from './modules/home/home.module';
import { InteracaoItemModule } from './modules/interacaoItem/interacaoItem.module';
import { InteracaoModule } from './modules/interacao/interacao.module';
import { KeycloakModule } from './modules/keycloak/keycloak.module';
import { ResponseSuccessInteracoesDTO } from './modules/interacao/dto/response.dto';

export function extractErrors(errors) {
  const result = [];
  for (const error of errors) {
    if (error.children && error.children.length > 0) {
      result.push(...extractErrors(error.children));
    } else if (error.constraints) {
      result.push({
        property: error.property,
        message: Object.values(error.constraints).join(', '),
      });
    }
  }
  return result;
}

@Module({
  imports: [
    DatabaseModule,
    HomeModule,
    InteracaoModule,
    InteracaoItemModule,
    KeycloakModule,
  ],
  providers: [
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        transform: true,
        stopAtFirstError: true,
        exceptionFactory: (errors) => {
          const extractedErrors = extractErrors(errors);
          if (extractedErrors.length === 0) {
            return new BadRequestException({
              message: 'Validação falhou com erro desconhecido',
              success: false,
            });
          }
          const response: ResponseSuccessInteracoesDTO = {
            message: `Erro '${extractedErrors[0]?.property}': ${extractedErrors[0]?.message}`,
            success: false,
          };
          return new BadRequestException(response);
        },
      }),
    },
  ],
})
export class AppModule {}
