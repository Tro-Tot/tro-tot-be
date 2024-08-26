import { Injectable } from '@nestjs/common';
import {
  isUUID,
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { I18nService } from 'nestjs-i18n';
import { I18nTranslations } from 'src/i18n/generated/i18n.generated';
import { HouseService } from '../house.service';

@Injectable()
@ValidatorConstraint({ async: true })
export class IsHouseExistValidator implements ValidatorConstraintInterface {
  constructor(
    private readonly houseService: HouseService,
    private readonly i18n: I18nService<I18nTranslations>,
  ) {}
  async validate(
    value: string,
    validationArguments?: ValidationArguments,
  ): Promise<boolean> {
    if (!value) return false;
    if (!isUUID(value)) return false;
    const house = await this.houseService.findOne(value);
    return !!house;
  }
  defaultMessage?(validationArguments?: ValidationArguments): string {
    return this.i18n.t('house.house_not_exist');
  }
}

export function IsHouseExist(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsHouseExistValidator,
      async: true,
    });
  };
}
