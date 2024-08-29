import { HouseServiceStatus } from '@prisma/client';
import { IsEnum, IsNotEmpty } from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';

export class UpdateHouseServiceDto {
  @IsEnum(HouseServiceStatus, {
    message: i18nValidationMessage('house-service.invalid_status'),
  })
  @IsNotEmpty()
  status: HouseServiceStatus;
}
