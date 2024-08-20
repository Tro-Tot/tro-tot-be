import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { CreateHouseDTO } from './dto/create-house.dto';
import { JwtAuthGuard } from '../auth/strategy/jwt-auth.guard';
import { RolesGuard } from 'src/common/guard/roles.guard';
import { RoleCode } from '@prisma/client';
import { Roles } from 'src/common/decorator/roles.decorator';
import { HouseService } from './house.service';

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
  @Roles(RoleCode.MANAGER, RoleCode.STAFF)
  async create(@Body() createHouseDTO: CreateHouseDTO) {
    return this.houseService.create(createHouseDTO);
  }

  @Post('/bulk')
  @UseGuards(JwtAuthGuard)
  @Roles(RoleCode.MANAGER, RoleCode.STAFF)
  async createMany(@Body() createHouseDTOs: CreateHouseDTO[]) {
    return this.houseService.createMany(createHouseDTOs);
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  @Roles(RoleCode.MANAGER, RoleCode.STAFF)
  async update(
    @Param('id') id: string,
    @Body() updateHouseDTO: CreateHouseDTO,
  ) {
    return this.houseService.update(id, updateHouseDTO);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @Roles(RoleCode.MANAGER, RoleCode.STAFF)
  async delete(@Param('id') id: string) {
    return this.houseService.delete(id);
  }
}
