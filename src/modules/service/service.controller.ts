import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Logger,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { RoleCode } from '@prisma/client';
import { I18n, I18nContext } from 'nestjs-i18n';
import { Public } from 'src/common/decorator/is-public.decorator';
import { Roles } from 'src/common/decorator/roles.decorator';
import { apiSuccess } from 'src/common/dto/api-response';
import { RolesGuard } from 'src/common/guard/roles.guard';
import { JwtAuthGuard } from '../auth/strategy/jwt-auth.guard';
import { CreateServiceDTO } from './dto/create-service.dto';
import { UpdateServiceDTO } from './dto/update-service.dto';
import { ServiceService } from './service.service';

@Controller('service')
@ApiTags('service')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(RoleCode.MANAGER)
export class ServiceController {
  constructor(private readonly serviceService: ServiceService) {}

  @Get()
  @Public()
  async getServices(@I18n() i18n: I18nContext) {
    return apiSuccess(
      HttpStatus.OK,
      await this.serviceService.getServices(),
      i18n.t('common.get_success'),
    );
  }

  @Get(':id')
  @Public()
  async getService(@Param('id') id: string, @I18n() i18n: I18nContext) {
    return apiSuccess(
      HttpStatus.OK,
      await this.serviceService.getService(id),
      i18n.t('common.get_success'),
    );
  }

  @Post()
  @Roles(RoleCode.MANAGER)
  async createService(
    @Body() createServiceDTO: CreateServiceDTO,
    @I18n() i18n: I18nContext,
  ) {
    return apiSuccess(
      HttpStatus.CREATED,
      await this.serviceService.createService(createServiceDTO),
      i18n.t('common.create_success'),
    );
  }

  @Post('/bulk')
  @Roles(RoleCode.MANAGER)
  async createServices(
    @Body() services: CreateServiceDTO[],
    @I18n() i18n: I18nContext,
  ) {
    return apiSuccess(
      HttpStatus.CREATED,
      await this.serviceService.createServices(services),
      i18n.t('common.create_success'),
    );
  }

  @Patch(':id')
  async updateService(
    @Param('id') id: string,
    @Body() updateServiceDTO: UpdateServiceDTO,
    @I18n() i18n: I18nContext,
  ) {
    Logger.debug(updateServiceDTO);
    return apiSuccess(
      HttpStatus.OK,
      await this.serviceService.updateService(id, updateServiceDTO),
      i18n.t('common.update_success'),
    );
  }

  @Delete(':id')
  @Roles(RoleCode.MANAGER)
  async deleteService(@Param('id') id: string, @I18n() i18n: I18nContext) {
    return apiSuccess(
      HttpStatus.OK,
      await this.serviceService.deleteService(id),
      i18n.t('common.delete_success'),
    );
  }
}
