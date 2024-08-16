import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { ApiResponse } from '../dto/response.dto';
import { apiFailed } from '../dto/api-response';
import { PrismaErrorEnum } from '../enum/prisma-error.enum';
import { CustomHttpException } from './custom-http.exception';

@Catch(CustomHttpException)
export class AuthExceptionFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}
  catch(exception: CustomHttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let logger = new Logger('AuthExceptionFilter');
    logger.verbose('-------------Exception Start-------------');
    logger.error(exception.stack);
    logger.error(exception.message);
    logger.error(exception.getCode());
    logger.verbose('-------------Exception End---------------');
    let responseBody: ApiResponse;

    let message = exception.message;
    let code = exception.getCode();
    switch (exception.message) {
      default:
        responseBody = apiFailed(401, message, code);
        break;
    }

    const { httpAdapter } = this.httpAdapterHost;
    httpAdapter.reply(ctx.getResponse(), responseBody, responseBody.statusCode);
  }
}
