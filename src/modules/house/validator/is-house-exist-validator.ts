import { Injectable } from '@nestjs/common';
import {
  registerDecorator,
  ValidationArguments,
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
} from 'class-validator';
import { I18nService } from 'nestjs-i18n';
import { PrismaService } from 'prisma/prisma.service';
import { I18nTranslations } from 'src/i18n/generated/i18n.generated';

@Injectable()
@ValidatorConstraint({ async: true })
export class IsHouseExistValidator implements ValidatorConstraintInterface {
  constructor(
    private readonly prisma: PrismaService,
    private readonly i18n: I18nService<I18nTranslations>,
  ) {}
  validate(
    value: string,
    validationArguments?: ValidationArguments,
  ): Promise<boolean> | boolean {
    return this.prisma.house
      .findUnique({
        where: {
          id: value,
        },
      })
      .then((house) => {
        return !!house;
      });
  }
  defaultMessage?(validationArguments?: ValidationArguments): string {
    return this.i18n.t('house.house_exist');
  }
}

export function IsHouseExist(validationOptions?: ValidationOptions) {
  return function (object: object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: this.validationOptions,
      constraints: [],
      validator: IsHouseExistValidator,
      async: true,
    });
  };
}
