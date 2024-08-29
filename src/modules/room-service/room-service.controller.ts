import { DirectFilterPipe } from '@chax-at/prisma-filter';
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UsePipes,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { I18nValidationPipe } from 'nestjs-i18n';
import { FilterDto } from 'src/common/dto/filter-query.dto';
import { CreateRoomServiceDto } from './dto/create-room-service.dto';
import { RoomServiceService } from './room-service.service';

@Controller('room-service')
export class RoomServiceController {
  constructor(private readonly roomServiceService: RoomServiceService) {}

  @Post()
  @UsePipes(new I18nValidationPipe({ whitelist: true, stopAtFirstError: true }))
  addServiceToRoom(@Body() createRoomServiceDto: CreateRoomServiceDto) {
    return this.roomServiceService.addServiceToRoom(createRoomServiceDto);
  }

  @Get('room/:roomId')
  @UsePipes(new I18nValidationPipe())
  getAllRoomServiceBasedOnRoomId(
    @Param('roomId') roomId: string,
    @Query(
      new DirectFilterPipe<any, Prisma.RoomServiceWhereInput>(
        ['status'],
        ['houseService.service.serviceName'],
      ),
    )
    filterDto: FilterDto<Prisma.RoomServiceWhereInput>,
  ) {
    return this.roomServiceService.getServiceBasedOnroomId(
      roomId,
      filterDto.findOptions,
    );
  }
}
