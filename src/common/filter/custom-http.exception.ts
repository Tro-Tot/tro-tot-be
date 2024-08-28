import { I18nValidationException } from 'nestjs-i18n';

export class CustomAuthException extends I18nValidationException {
  constructor(code: number, message: string, errors: any) {
    super(errors, code);
    this.message = message;
  }
}
