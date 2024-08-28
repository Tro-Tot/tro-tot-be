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
import { RoomService } from '../room.service';

@Injectable()
@ValidatorConstraint({ async: true })
export class IsRoomExistValidator implements ValidatorConstraintInterface {
  constructor(
    private roomService: RoomService,
    private i18n: I18nService,
  ) {}

  validate(
    value: any,
    validationArguments?: ValidationArguments,
  ): Promise<boolean> | boolean {
    if (!IsUUID(value)) return false;

    const room = this.roomService.findOne(value);

    return !!room;
  }
  defaultMessage?(validationArguments?: ValidationArguments): string {
    return this.i18n.t('room.room_not_exist');
  }
}

export function IsRoomExist(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      constraints: [],
      validator: IsRoomExistValidator,
    });
  };
}
