import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';
import { I18nTranslations } from 'src/i18n/generated/i18n.generated';

export class ResetPasswordDTO {
  @ApiProperty()
  @IsString({
    message: i18nValidationMessage<I18nTranslations>(
      'validation.INVALID_STRING',
    ),
  })
  token: string;

  @ApiProperty()
  @IsString({
    message: i18nValidationMessage<I18nTranslations>(
      'validation.INVALID_STRING',
    ),
  })
  newPassword: string;
}
