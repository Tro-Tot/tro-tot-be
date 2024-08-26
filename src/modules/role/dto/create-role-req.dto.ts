import { ApiProperty } from '@nestjs/swagger';
import { RoleCode } from '@prisma/client';
import {
  IsEnum,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';

export class CreateRoleReqDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(50)
  name: string;

  @ApiProperty()
  @IsEnum(RoleCode, {
    message: i18nValidationMessage('validation.INVALID_ROLE_CODE'),
  })
  code: RoleCode;
}
