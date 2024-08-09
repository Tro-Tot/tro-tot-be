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
      case PrismaErrorEnum.OperationDependencyNotFound:
        message = `An operation failed because it depends on one or more records that were required but not found`;
        responseBody = apiFailed(HttpStatus.CONFLICT, message, exception.meta);
        break;
      case PrismaErrorEnum.ForeignKeyConstraintFailed:
        message = `An operation failed because it would violate a primary key constraint ${exception.meta.target}`;
        responseBody = apiFailed(HttpStatus.CONFLICT, message, exception.meta);
        break;
      default:
        responseBody = apiFailed(HttpStatus.BAD_REQUEST, message);
        break;
    }

    const { httpAdapter } = this.httpAdapterHost;
    httpAdapter.reply(ctx.getResponse(), responseBody, responseBody.statusCode);
  }
}
