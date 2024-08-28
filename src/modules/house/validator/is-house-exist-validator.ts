import { HttpStatus, Injectable } from '@nestjs/common';
import {
  isUUID,
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { I18nContext, I18nService, I18nValidationError } from 'nestjs-i18n';
import { CustomI18nException } from 'src/common/filter/custom-i18n.exception';
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

    if (!house) {
      const errors: I18nValidationError[] = [
        {
          property: validationArguments.property,
          constraints: {
            houseNotExist: this.i18n.t('house.house_not_exist', {
              lang: I18nContext.current().lang,
            }),
          },
          value: value,
          children: [],
          contexts: {},
          target: validationArguments.object,
        },
      ];
      throw new CustomI18nException(
        errors,

        HttpStatus.NOT_FOUND,
        this.i18n.t('house.house_not_exist', {
          lang: I18nContext.current().lang,
        }),
      );
    }

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
