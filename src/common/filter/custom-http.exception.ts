import { UnauthorizedException } from '@nestjs/common';

export class CustomHttpException extends UnauthorizedException {
  constructor(statusCode: number, message: string, code: any) {
    super({ statusCode, message, code });
  }
  getCode(): string {
    return (this.getResponse() as any).code;
  }
}
