import { Body, Controller, Post, UsePipes } from '@nestjs/common';
import { I18nValidationPipe } from 'nestjs-i18n';
import { CreateRoomServiceDto } from './dto/create-room-service.dto';
import { RoomServiceService } from './room-service.service';

@Controller('room-service')
export class RoomServiceController {
  constructor(private readonly roomServiceService: RoomServiceService) {}

  @Post()
  @UsePipes(
    new I18nValidationPipe({ whitelist: true, stopAtFirstError: false }),
  )
  addServiceToRoom(@Body() createRoomServiceDto: CreateRoomServiceDto) {
    return this.roomServiceService.addServiceToRoom(createRoomServiceDto);
  }
}
