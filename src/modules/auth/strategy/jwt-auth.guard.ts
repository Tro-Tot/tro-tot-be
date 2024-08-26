import { ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JsonWebTokenError } from '@nestjs/jwt';
import { AuthGuard } from '@nestjs/passport';
import { I18nService } from 'nestjs-i18n';
import { Observable } from 'rxjs';
import { CustomHttpException } from 'src/common/filter/custom-http.exception';
import { I18nTranslations } from 'src/i18n/generated/i18n.generated';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(
    private readonly reflector: Reflector,
    private readonly i18n: I18nService<I18nTranslations>,
  ) {
    super();
  }
  handleRequest(err: any, user: any, info: any, context: any, status: any) {
    if (info instanceof JsonWebTokenError) {
      // if (info.name === 'TokenExpiredError') {
      //   throw new CustomHttpException(401, this.i18n.t('auth.token_expired'), [
      //     error,
      //   ]);
      // } else {
      //   error.constraints = {
      //     invalidToken: this.i18n.t('auth.invalid_token'),
      //   };
      //   error.value = info.message;
      //   error.constraints={
      //     invalidToken: this.i18n.t('auth.invalid_token')
      //   }
      //   error.property = 'token';
      //   error.target = context.switchToHttp().getRequest().headers;

      //   throw new CustomHttpException(401, 'Invalid Token!', [error]);
      // }
      if (info.name === 'TokenExpiredError') {
        throw new CustomHttpException(
          401,
          this.i18n.t('auth.token_expired'),
          'EXPIRED',
        );
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
