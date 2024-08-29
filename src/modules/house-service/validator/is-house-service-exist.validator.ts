import { Injectable } from '@nestjs/common';
import {
  IsUUID,
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { I18nService } from 'nestjs-i18n';
import { HouseServiceService } from '../house-service.service';

@Injectable()
@ValidatorConstraint({ async: true })
export class IsHouseServiceExistValidator
  implements ValidatorConstraintInterface
{
  constructor(
    private houseServiceService: HouseServiceService,
    private i18n: I18nService,
  ) {}

  async validate(
    value: any,
    validationArguments?: ValidationArguments,
  ): Promise<boolean> {
    if (!IsUUID(value)) return false;

    const houseService = await this.houseServiceService.findOne(value);

    return !!houseService;
  }
  defaultMessage?(validationArguments?: ValidationArguments): string {
    return this.i18n.t('house-service.house_service_not_exist');
  }
}

export function IsHouseServiceExist(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsHouseServiceExistValidator,
    });
  };
}
