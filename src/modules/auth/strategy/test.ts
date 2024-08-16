import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JsonWebTokenError, TokenExpiredError } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  handleRequest(err: any, user: any, info: any, context: any, status: any) {
    console.log(info instanceof TokenExpiredError);
    console.log(info instanceof JsonWebTokenError);
    if (info instanceof JsonWebTokenError) {
      if (info.name === 'TokenExpiredError') {
        throw new UnauthorizedException('Jwt Expired!');
      } else {
        throw new UnauthorizedException('Invalid Token!');
      }
    }
    return super.handleRequest(err, user, info, context, status);
  }
}
