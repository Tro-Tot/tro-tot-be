import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { AllExceptionsFilter } from './all-exceptions.filter';
import { HttpAdapterHost } from '@nestjs/core';
import { ApiResponse } from '../dto/response.dto';
import { apiFailed } from '../dto/api-response';
import { PrismaErrorEnum } from '../enum/prisma-error.enum';

@Catch(PrismaClientKnownRequestError)
export class PrismaExceptionFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}
  catch(exception: PrismaClientKnownRequestError, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let logger = new Logger('PrismaExceptionFilter');
    logger.verbose('-------------Exception Start-------------');
    logger.error(exception.stack);
    logger.verbose('-------------Exception End---------------');
    let responseBody: ApiResponse;

    let message = exception.message;

    switch (exception.code) {
      case 'P2025':
        message = 'Record does not exist for';
        responseBody = apiFailed(HttpStatus.CONFLICT, message);
        break;
      case PrismaErrorEnum.UniqueConstraintFailed:
        message = `Unique constraint violation for ${exception.meta.target}`;
        responseBody = apiFailed(HttpStatus.CONFLICT, message);
        break;
      default:
        responseBody = apiFailed(HttpStatus.BAD_REQUEST, message);
        break;
    }

    const { httpAdapter } = this.httpAdapterHost;
    httpAdapter.reply(ctx.getResponse(), responseBody, responseBody.statusCode);
  }
}
