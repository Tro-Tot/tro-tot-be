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
  Query,
  UseInterceptors,
  UploadedFiles,
  UseFilters,
} from '@nestjs/common';
import { RoomService } from './room.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/common/decorator/roles.decorator';
import { RoleCode, RoomStatus } from '@prisma/client';
import { GetUser } from 'src/common/decorator/get_user.decorator';
import { RolesGuard } from 'src/common/guard/roles.guard';
import { JwtAuthGuard } from '../auth/strategy/jwt-auth.guard';
import { FilesInterceptor } from '@nestjs/platform-express';
import { UpdateAttachmentDto } from '../attachment/dto/update-attachment.dto';
import { IsRoomExist } from './pipe/is-room-exist.pipe';
import { IsAttachmentExist } from '../attachment/pipe/is-attachment-exist.pipe';

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

  @Get(':id')
  findAll(@Param('id') id: string) {
    return this.roomService.findOne(id);
  }

  @Get('/house/:houseId')
  findAllRoomByRoomId(
    @Param('houseId') houseId: string,
    @Query('page') page?: number,
    @Query('page-size') pageSize?: number,
    @Query('cursor') cursor?: string,
    @Query('where') where?: string,
    @Query('orderBy') orderBy?: string,
  ) {
    const params = {
      page: page ? Number(page) : undefined,
      pageSize: pageSize ? Number(pageSize) : undefined,
      cursor: cursor ? JSON.parse(cursor) : undefined,
      where: where ? JSON.parse(where) : undefined,
      orderBy: orderBy ? JSON.parse(orderBy) : undefined,
    };
    return this.roomService.findAllRoomByHouseId(params, houseId);
  }

  //Test general where endpoint
  @Get('/house/:houseId/test')
  findAllRoomByRoomIdTest(
    @Param('houseId') houseId: string,
    @Query() query?: Record<string, string>,
  ) {
    return this.roomService.findAllRoomByRoomIdGeneral(query, houseId);
  }

  @Post(':id/image')
  // @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(FilesInterceptor('files', 10))
  async uploadImagesArray(
    @UploadedFiles() files: Express.Multer.File[],
    @Param('id', IsRoomExist) roomId: string,
  ) {
    return this.roomService.uploadImages(roomId, files);
  }

  @Patch(':id/image/:imageId')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  // @UseGuards(AuthGuard('jwt'))
  async updateImage(
    @Param('id', IsRoomExist) roomId: string,
    @Param('imageId', IsAttachmentExist) attachmentId: string,
    @Body() updatedAttachment: UpdateAttachmentDto,
  ) {
    return this.roomService.updateImage(attachmentId, updatedAttachment);
  }

  @Delete(':id/image/:imageId')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  // @UseGuards(AuthGuard('jwt'))
  async deleteImage(
    @Param('id', IsRoomExist) roomId: string,
    @Param('imageId', IsAttachmentExist) attachmentId: string,
  ) {
    return this.roomService.deletedImage(roomId, attachmentId);
  }

  @Patch(':id')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  update(
    @Param('id', IsRoomExist) id: string,
    @Body() updateRoomDto: UpdateRoomDto,
  ) {
    return this.roomService.update(id, updateRoomDto);
  }

  @Patch(':id/status')
  @UsePipes(new ValidationPipe({ whitelist: true }))
  //No need to use IsRoomExist because already check in updateRoomStatus
  updateRoomStatus(@Param('id') id: string, @Body() roomStatus: RoomStatus) {
    return this.roomService.updateRoomStatus(id, roomStatus);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.roomService.remove(+id);
  }
}
