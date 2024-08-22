import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { HouseService } from '../house.service';

@Injectable()
export class IsHouseOfStaff implements PipeTransform {
  constructor(private readonly houseService: HouseService) {}
  transform({ houseId, staffId }: any, metadata: ArgumentMetadata) {
    if (this.houseService.isHouseOfStaff(houseId, staffId)) {
      throw new BadRequestException('Nhà không thuộc quyền quản lý của bạn');
    }
    return houseId;
  }
}
