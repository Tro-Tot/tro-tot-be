import { Injectable } from '@nestjs/common';
import { JsonWebTokenError } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class RefreshJwtAuthGuard extends AuthGuard('jwt-refresh') {
  handleRequest(err: any, user: any, info: any, context: any, status: any) {
    if (info instanceof JsonWebTokenError) {
      //   if (info.name === 'TokenExpiredError') {
      //     throw new CustomHttpException(401, 'Expired Token!', 'UNAUTHORIZED');
      //   } else {
      //     throw new CustomHttpException(401, 'Invalid Token!', 'UNAUTHORIZED');
      //   }
      // }
      // if (info instanceof Error) {
      //   throw new CustomHttpException(401, 'No Token!', 'UNAUTHORIZED');
    }
    return super.handleRequest(err, user, info, context, status);
  }
}
