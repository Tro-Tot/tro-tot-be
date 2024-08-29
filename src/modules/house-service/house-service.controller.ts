import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
  UsePipes,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { RoleCode } from '@prisma/client';
import { I18nValidationPipe } from 'nestjs-i18n';
import { Public } from 'src/common/decorator/is-public.decorator';
import { Roles } from 'src/common/decorator/roles.decorator';
import { RolesGuard } from 'src/common/guard/roles.guard';
import { JwtAuthGuard } from '../auth/strategy/jwt-auth.guard';
import { IsHouseExistPipe } from '../house/pipe/is-house-exist.pipe';
import { CreateHouseServiceDto } from './dto/create-house-service.dto';
import { UpdateHouseServiceDto } from './dto/update-house-service.dto';
import { HouseServiceService } from './house-service.service';

@ApiTags('house-service')
@Controller('house-service')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(RoleCode.TECHNICAL_STAFF, RoleCode.STAFF, RoleCode.MANAGER)
export class HouseServiceController {
  constructor(private readonly houseServiceService: HouseServiceService) {}

  @Post()
  create(@Body() createHouseServiceDto: CreateHouseServiceDto) {
    return this.houseServiceService.create(createHouseServiceDto);
  }

  @Get(':id')
  @Public()
  findOne(@Param('id') id: string) {
    return this.houseServiceService.findOne(id);
  }
  @Patch(':id')
  @UsePipes(new I18nValidationPipe({ whitelist: true }))
  updateHouseService(
    @Param(':id') houseServiceId: string,
    @Body() updateHouseServiceDto: UpdateHouseServiceDto,
  ) {
    return this.houseServiceService.updateHouseService(updateHouseServiceDto);
  }
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.houseServiceService.remove(id);
  }

  @Get('/house/:houseId')
  @Public()
  findAllBasedOnHouseId(@Param('houseId', IsHouseExistPipe) houseId: string) {
    return this.houseServiceService.findAllBasedOnHouseId(houseId);
  }
}
