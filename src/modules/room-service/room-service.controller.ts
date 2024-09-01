import { DirectFilterPipe } from '@chax-at/prisma-filter';
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Prisma, RoleCode } from '@prisma/client';
import { I18nValidationPipe } from 'nestjs-i18n';
import { Public } from 'src/common/decorator/is-public.decorator';
import { Roles } from 'src/common/decorator/roles.decorator';
import { FilterDto } from 'src/common/dto/filter-query.dto';
import { RolesGuard } from 'src/common/guard/roles.guard';
import { JwtAuthGuard } from '../auth/strategy/jwt-auth.guard';
import { CreateRoomServiceDto } from './dto/create-room-service.dto';
import { RoomServiceService } from './room-service.service';

@Controller('room-service')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(RoleCode.TECHNICAL_STAFF, RoleCode.STAFF)
@ApiTags('room-service')
export class RoomServiceController {
  constructor(private readonly roomServiceService: RoomServiceService) {}

  @Post()
  @UsePipes(new I18nValidationPipe({ whitelist: true, stopAtFirstError: true }))
  addServiceToRoom(@Body() createRoomServiceDto: CreateRoomServiceDto) {
    return this.roomServiceService.addServiceToRoom(createRoomServiceDto);
  }

  @Get(':id')
  @Public()
  getOneRoom(@Param('id') roomServiceId: string) {
    return this.roomServiceService.findOneRoomService(roomServiceId);
  }

  @Get('room/:roomId')
  @Public()
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
    return this.roomServiceService.findServiceBasedOnroomId(
      roomId,
      filterDto.findOptions,
    );
  }
}
