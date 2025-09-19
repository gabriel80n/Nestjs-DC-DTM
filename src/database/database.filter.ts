import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from '@nestjs/common';
import { QueryFailedError } from 'typeorm';

@Catch(QueryFailedError)
export class DatabaseFilter<T> implements ExceptionFilter {
  catch(exception: T, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();

    console.log('exception', exception);
    
    const status = HttpStatus.INTERNAL_SERVER_ERROR;
    const message = (exception as any).message || 'Não conectado ao banco de dados';

    response.status(status).json({
      statusCode: status,
      message,
    });
  }
}
