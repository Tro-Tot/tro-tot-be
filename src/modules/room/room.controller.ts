import { DirectFilterPipe } from '@chax-at/prisma-filter';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';
import { Prisma, RoleCode, RoomStatus } from '@prisma/client';
import { I18nValidationPipe } from 'nestjs-i18n';
import { Public } from 'src/common/decorator/is-public.decorator';
import { Roles } from 'src/common/decorator/roles.decorator';
import { FilterDto } from 'src/common/dto/filter-query.dto';
import { RolesGuard } from 'src/common/guard/roles.guard';
import { UpdateAttachmentDto } from '../attachment/dto/update-attachment.dto';
import { IsAttachmentExist } from '../attachment/pipe/is-attachment-exist.pipe';
import { JwtAuthGuard } from '../auth/strategy/jwt-auth.guard';
import { IsHouseExistPipe } from '../house/pipe/is-house-exist.pipe';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { ParseRoomDtoInterceptor } from './interceptor/parse-room-dto.interceptor';
import { IsRoomExist } from './pipe/is-room-exist.pipe';
import { RoomService } from './room.service';

@Controller('room')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(RoleCode.TECHNICAL_STAFF, RoleCode.MANAGER)
@ApiTags('rooms')
export class RoomController {
  constructor(private readonly roomService: RoomService) {}

  // @Post()
  // @UsePipes(new ValidationPipe())
  // create(@Body() createRoomDto: CreateRoomDto) {
  //   return this.roomService.create(createRoomDto);
  // }

  @Post()
  @UseInterceptors(FilesInterceptor('files', 10), ParseRoomDtoInterceptor)
  @UsePipes(
    new I18nValidationPipe({ whitelist: true, stopAtFirstError: false }),
  )
  createTest(
    @Body('room') createRoomDto: CreateRoomDto,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    return this.roomService.createRoomWithImage(createRoomDto, files);
  }

  @Get(':id')
  @Public()
  findAll(@Param('id') id: string) {
    return this.roomService.findOne(id);
  }

  @Get('/house/:houseId')
  @Public()
  findAllRoomByHouseId(
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
  @Public()
  findAllRoomByHouseIdTest(
    @Param('houseId', IsHouseExistPipe) houseId: string,
    @Query() query?: Record<string, string>,
  ) {
    return this.roomService.findAllRoomByRoomIdGeneral(query, houseId);
  }

  @Get('/house/:houseId/test2')
  @Public()
  findAllRoomByHouseIdTest2(
    @Param('houseId', IsHouseExistPipe) houseId: string,
    @Query(
      new DirectFilterPipe<any, Prisma.RoomWhereInput>([
        'roomName',
        'rentPrice',
        'status',
        'AND',
      ]),
    )
    filterDto: FilterDto<Prisma.RoomWhereInput>,
  ) {
    console.log(filterDto);
    return this.roomService.findAllRoomByRoomIdGeneral(
      filterDto.findOptions,
      houseId,
    );
  }

  @Post(':id/image')
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
