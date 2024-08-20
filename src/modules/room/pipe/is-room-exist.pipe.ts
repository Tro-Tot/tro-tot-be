import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { RoomService } from '../room.service';

@Injectable()
export class IsRoomExist implements PipeTransform {
  constructor(private roomService: RoomService) {}
  async transform(value: string) {
    //The error is already throw in method findOne
    const isRoomExist = !!(await this.roomService.findOne(value));

    //Just for sure
    if (!isRoomExist) {
      throw new BadRequestException('Room not exist');
    }
    return value;
  }
}
