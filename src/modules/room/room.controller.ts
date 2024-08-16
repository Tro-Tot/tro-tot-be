import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { RoomService } from './room.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/common/decorator/roles.decorator';
import { RoleCode } from '@prisma/client';
import { GetUser } from 'src/common/decorator/get_user.decorator';
import { RolesGuard } from 'src/common/guard/roles.guard';
import { JwtAuthGuard } from '../auth/strategy/jwt-auth.guard';

@Controller('room')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(RoleCode.TECHNICAL_STAFF)
  @UsePipes(new ValidationPipe())
  create(@Body() createRoomDto: CreateRoomDto) {
    return this.roomService.create(createRoomDto);
  }

  @Get()
  findAll() {
    return this.roomService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.roomService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateRoomDto: UpdateRoomDto) {
    return this.roomService.update(+id, updateRoomDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.roomService.remove(+id);
  }
}
