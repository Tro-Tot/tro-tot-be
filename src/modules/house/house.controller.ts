import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
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
import { I18n, I18nContext } from 'nestjs-i18n';
import { Roles } from 'src/common/decorator/roles.decorator';
import { apiSuccess } from 'src/common/dto/api-response';
import { CustomUUIDPipe } from 'src/common/pipe/custom-uuid.pipe';
import { IsAttachmentExist } from '../attachment/pipe/is-attachment-exist.pipe';
import { JwtAuthGuard } from '../auth/strategy/jwt-auth.guard';
import { CreateHouseDTO } from './dto/create-house.dto';
import { HouseService } from './house.service';
import { IsHouseExistPipe } from './pipe/is-house-exist.pipe';

@Controller('house')
export class HouseController {
  constructor(private readonly houseService: HouseService) {}

  @Get()
  async findAll(@I18n() i18n: I18nContext) {
    return apiSuccess(
      HttpStatus.OK,
      await this.houseService.findAll(),
      i18n.t('common.get_success'),
    );
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @I18n() i18n: I18nContext) {
    return apiSuccess(
      HttpStatus.OK,
      await this.houseService.findFirst(id),
      i18n.t('common.get_success'),
    );
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @Roles(RoleCode.MANAGER, RoleCode.TECHNICAL_STAFF, RoleCode.STAFF)
  async create(
    @Body() createHouseDTO: CreateHouseDTO,
    @I18n() i18n: I18nContext,
  ) {
    return apiSuccess(
      HttpStatus.CREATED,
      await this.houseService.create(createHouseDTO),
      i18n.t('common.create_success'),
    );
  }

  @Post('/bulk')
  @UseGuards(JwtAuthGuard)
  @Roles(RoleCode.MANAGER, RoleCode.TECHNICAL_STAFF, RoleCode.STAFF)
  async createMany(
    @Body() createHouseDTOs: CreateHouseDTO[],
    @I18n() i18n: I18nContext,
  ) {
    return apiSuccess(
      HttpStatus.CREATED,
      await this.houseService.createMany(createHouseDTOs),
      i18n.t('common.create_success'),
    );
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @Roles(RoleCode.MANAGER, RoleCode.TECHNICAL_STAFF, RoleCode.STAFF)
  async update(
    @Param('id', new CustomUUIDPipe(), IsHouseExistPipe)
    id: UUID,
    @Body() updateHouseDTO: CreateHouseDTO,
    @I18n() i18n: I18nContext,
  ) {
    return apiSuccess(
      HttpStatus.OK,
      await this.houseService.update(id, updateHouseDTO),
      i18n.t('common.update_success'),
    );
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @Roles(RoleCode.MANAGER, RoleCode.TECHNICAL_STAFF, RoleCode.STAFF)
  async delete(@Param('id') id: string, @I18n() i18n: I18nContext) {
    return apiSuccess(
      HttpStatus.OK,
      await this.houseService.delete(id),
      i18n.t('common.delete_success'),
    );
  }

  @Post(':id/image')
  @UseInterceptors(FilesInterceptor('files', 10))
  async uploadImagesArray(
    @UploadedFiles() files: Express.Multer.File[],
    @Param('id', new CustomUUIDPipe(), IsHouseExistPipe) houseId: string,
    @I18n() i18n: I18nContext,
  ) {
    return apiSuccess(
      HttpStatus.CREATED,
      await this.houseService.uploadImages(houseId, files),
      i18n.t('common.upload_success'),
    );
  }

  @Delete(':id/image/:imageId')
  @Roles(RoleCode.MANAGER, RoleCode.TECHNICAL_STAFF, RoleCode.STAFF)
  async deleteImage(
    @Param('id', IsHouseExistPipe) roomId: string,
    @Param('imageId', IsAttachmentExist) attachmentId: string,
    @I18n() i18n: I18nContext,
  ) {
    return apiSuccess(
      HttpStatus.OK,
      await this.houseService.deleteImage(roomId, attachmentId),
      i18n.t('common.delete_success'),
    );
  }
}
