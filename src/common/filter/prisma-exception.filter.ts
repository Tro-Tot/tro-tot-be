import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import {
  PrismaClientKnownRequestError,
  PrismaClientValidationError,
} from '@prisma/client/runtime/library';
import { apiFailed } from '../dto/api-response';
import { ApiResponse } from '../dto/response.dto';
import { PrismaErrorEnum } from '../enum/prisma-error.enum';

@Catch(PrismaClientKnownRequestError, PrismaClientValidationError)
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
        message = exception?.message
          ? exception.message
          : `An operation failed because it depends on one or more records that were required but not found`;
        responseBody = apiFailed(HttpStatus.CONFLICT, message, exception.meta);
        break;
      case PrismaErrorEnum.ForeignKeyConstraintFailed:
        message = `An operation failed because it would violate a primary key constraint ${exception.meta.target}`;
        responseBody = apiFailed(HttpStatus.CONFLICT, message, exception.meta);
        break;

      case PrismaErrorEnum.UniqueConstraintFailed:
        message = `An operation failed because it would violate a unique key constraint ${exception.meta.target}`;
        responseBody = apiFailed(
          HttpStatus.CONFLICT,
          message,
          exception.meta.target,
        );
        break;
      case PrismaErrorEnum.DatabaseConnectionFailed:
        message = `Database connection failed`;
        responseBody = apiFailed(HttpStatus.INTERNAL_SERVER_ERROR, message);
        break;
      case PrismaErrorEnum.RequiredRecordNotFound:
        message = `Required record not found`;
        responseBody = apiFailed(HttpStatus.BAD_REQUEST, message);
        break;
      default:
        responseBody = apiFailed(HttpStatus.BAD_REQUEST, message);
        break;
    }

    const { httpAdapter } = this.httpAdapterHost;
    httpAdapter.reply(ctx.getResponse(), responseBody, responseBody.statusCode);
  }
}
