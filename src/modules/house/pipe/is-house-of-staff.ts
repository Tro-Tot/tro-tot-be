import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { I18nContext } from 'nestjs-i18n';
import { I18nTranslations } from 'src/i18n/generated/i18n.generated';
import { HouseService } from '../house.service';

@Injectable()
export class IsHouseOfStaff implements PipeTransform {
  constructor(private readonly houseService: HouseService) {}
  transform({ houseId, staffId }: any, metadata: ArgumentMetadata) {
    if (!this.houseService.isHouseOfStaff(houseId, staffId)) {
      throw new BadRequestException(
        I18nContext.current<I18nTranslations>().t(
          'house.house_not_belong_to_staff',
        ),
      );
    }
    return houseId;
  }
}
