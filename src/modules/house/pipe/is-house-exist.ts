import { Injectable } from '@nestjs/common';
import { PipeTransform, BadRequestException } from '@nestjs/common';
import { HouseService } from '../house.service';

@Injectable()
export class IsHouseExist implements PipeTransform {
  constructor(private houseService: HouseService) {}
  async transform(value: string) {
    const isHouseExist = !!(await this.houseService.findOne(value));

    if (!isHouseExist) {
      throw new BadRequestException('Nhà không tồn tại');
    }
    return value;
  }
}
