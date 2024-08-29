import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { RoleCode } from '@prisma/client';
import { UUID } from 'crypto';
import { Roles } from 'src/common/decorator/roles.decorator';
import { CustomUUIDPipe } from 'src/common/pipe/custom-uuid.pipe';
import { IsAttachmentExist } from '../attachment/pipe/is-attachment-exist.pipe';
import { JwtAuthGuard } from '../auth/strategy/jwt-auth.guard';
import { CreateHouseDTO } from './dto/create-house.dto';
import { HouseService } from './house.service';
import { IsHouseExistPipe } from './pipe/is-house-exist.pipe';
import { GetUser } from 'src/common/decorator/get_user.decorator';
import { AuthenUser } from '../auth/dto/authen-user.dto';

@Controller('house')
export class HouseController {
  constructor(private readonly houseService: HouseService) {}

  @Get()
  async findAll() {
    return this.houseService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.houseService.findOne(id);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @Roles(RoleCode.MANAGER, RoleCode.TECHNICAL_STAFF, RoleCode.STAFF)
  async create(@Body() createHouseDTO: CreateHouseDTO) {
    return this.houseService.create(createHouseDTO);
  }

  @Post('/bulk')
  @UseGuards(JwtAuthGuard)
  @Roles(RoleCode.MANAGER, RoleCode.TECHNICAL_STAFF, RoleCode.STAFF)
  async createMany(@Body() createHouseDTOs: CreateHouseDTO[]) {
    return this.houseService.createMany(createHouseDTOs);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @Roles(RoleCode.MANAGER, RoleCode.TECHNICAL_STAFF, RoleCode.STAFF)
  async update(
    @Param('id', new CustomUUIDPipe(), IsHouseExistPipe)
    id: UUID,
    @Body() updateHouseDTO: CreateHouseDTO,
    @GetUser() user: AuthenUser,
  ) {
    return this.houseService.update(id, updateHouseDTO);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @Roles(RoleCode.MANAGER, RoleCode.TECHNICAL_STAFF, RoleCode.STAFF)
  async delete(@Param('id') id: string) {
    return this.houseService.delete(id);
  }

  @Post(':id/image')
  @UseInterceptors(FilesInterceptor('files', 10))
  async uploadImagesArray(
    @UploadedFiles() files: Express.Multer.File[],
    @Param('id', new CustomUUIDPipe(), IsHouseExistPipe) houseId: string,
  ) {
    return this.houseService.uploadImages(houseId, files);
  }

  @Delete(':id/image/:imageId')
  @Roles(RoleCode.MANAGER, RoleCode.TECHNICAL_STAFF, RoleCode.STAFF)
  async deleteImage(
    @Param('id', IsHouseExistPipe) roomId: string,
    @Param('imageId', IsAttachmentExist) attachmentId: string,
  ) {
    return this.houseService.deletedImage(roomId, attachmentId);
  }
}
