import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JsonWebTokenError, TokenExpiredError } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import { Observable } from 'rxjs';
import { CustomHttpException } from 'src/common/filter/custom-http.exception';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private readonly reflector: Reflector) {
    super();
  }
  handleRequest(err: any, user: any, info: any, context: any, status: any) {
    if (info instanceof JsonWebTokenError) {
      if (info.name === 'TokenExpiredError') {
        throw new CustomHttpException(401, 'Expired Token!', 'EXPIRED');
      } else {
        throw new CustomHttpException(401, 'Invalid Token!', 'INVALID_TOKEN');
      }
    }
    if (info instanceof Error) {
      throw new CustomHttpException(401, 'No Token!', 'UNAUTHORIZED');
    }

    return super.handleRequest(err, user, info, context, status);
  }

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const isPublic = this.reflector.get<boolean>(
      'isPublic',
      context.getHandler(),
    );

    if (isPublic) {
      return true;
    }
    return super.canActivate(context);
  }
}
