import { Injectable } from '@nestjs/common';
import { CreateRoomServiceDto } from './dto/create-room-service.dto';

@Injectable()
export class RoomServiceService {
  addServiceToRoom(createRoomServiceDto: CreateRoomServiceDto) {
    return 'This action adds a new roomService';
  }
}
