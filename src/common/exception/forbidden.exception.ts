import { HttpException, HttpStatus } from '@nestjs/common';

class ForbiddenException extends HttpException {
  constructor(message: string) {
    super(message, HttpStatus.FORBIDDEN);
  }
}
