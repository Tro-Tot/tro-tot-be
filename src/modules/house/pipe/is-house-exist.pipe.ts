import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { I18nService } from 'nestjs-i18n';
import { HouseService } from '../house.service';

@Injectable()
export class IsHouseExistPipe implements PipeTransform {
  constructor(
    private readonly houseService: HouseService,
    private readonly i18nService: I18nService,
  ) {}
  async transform(value: string) {
    const isHouseExist = !!(await this.houseService.findFirst(value));

    if (!isHouseExist) {
      throw new BadRequestException('house.house_not_exist');
    }
    return value;
  }
}
