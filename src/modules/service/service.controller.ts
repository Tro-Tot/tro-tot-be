import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { Service } from '@prisma/client';
import { ServiceService } from './service.service';

@Controller('service')
@ApiTags('service')
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
  async createService(@Body() service: Service): Promise<Service> {
    return this.serviceService.createService(service);
  }

  @Post('bulk')
  async createServices(
    @Body() services: Service[],
  ): Promise<{ createdServices: Service[]; failedServices: Service[] }> {
    return this.serviceService.createServices(services);
  }

  @Put(':id')
  async updateService(
    @Param('id') id: string,
    @Body() service: Service,
  ): Promise<Service> {
    return this.serviceService.updateService(id, service);
  }

  @Delete(':id')
  async deleteService(@Param('id') id: string): Promise<Service> {
    return this.serviceService.deleteService(id);
  }
}
