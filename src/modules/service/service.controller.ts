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
import { ApiTags } from '@nestjs/swagger';
import { RoleCode, Service } from '@prisma/client';
import { ServiceService } from './service.service';
import { RolesGuard } from 'src/common/guard/roles.guard';
import { AuthGuard } from '@nestjs/passport';
import { Reflector } from '@nestjs/core';
import { Roles } from 'src/common/decorator/roles.decorator';
import { CreateServiceDTO } from './dto/create-service.dto';

@Controller('service')
@ApiTags('service')
@UseGuards(AuthGuard('jwt'))
export class ServiceController {
  constructor(private readonly serviceService: ServiceService) {}

  @Get()
  async getServices(): Promise<Service[]> {
    return this.serviceService.getServices();
  }

  @Get(':id')
  async getService(@Param('id') id: string): Promise<Service> {
    return this.serviceService.getService(id);
  }

  @Post()
  @Roles(RoleCode.MANAGER)
  async createService(
    @Body() createServiceDTO: CreateServiceDTO,
  ): Promise<Service> {
    return this.serviceService.createService(createServiceDTO);
  }

  @Post('bulk')
  @Roles(RoleCode.MANAGER)
  async createServices(
    @Body() services: Service[],
  ): Promise<{
    createdServices: Service[];
    failedServices: CreateServiceDTO[];
  }> {
    return this.serviceService.createServices(services);
  }

  @Put(':id')
  @Roles(RoleCode.MANAGER)
  async updateService(
    @Param('id') id: string,
    @Body() service: Service,
  ): Promise<Service> {
    return this.serviceService.updateService(id, service);
  }

  @Delete(':id')
  @Roles(RoleCode.MANAGER)
  async deleteService(@Param('id') id: string): Promise<Service> {
    return this.serviceService.deleteService(id);
  }
}
