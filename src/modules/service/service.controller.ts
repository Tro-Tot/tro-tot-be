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
import { AuthGuard } from '@nestjs/passport';
import { ApiTags } from '@nestjs/swagger';
import { RoleCode, Service } from '@prisma/client';
import { Public } from 'src/common/decorator/is-public.decorator';
import { Roles } from 'src/common/decorator/roles.decorator';
import { CreateServiceDTO } from './dto/create-service.dto';
import { UpdateServiceDTO } from './dto/update-service.dto';
import { ServiceService } from './service.service';

@Controller('service')
@ApiTags('service')
@UseGuards(AuthGuard('jwt'))
export class ServiceController {
  constructor(private readonly serviceService: ServiceService) {}

  @Get()
  @Public()
  async getServices(): Promise<Service[]> {
    return this.serviceService.getServices();
  }

  @Get(':id')
  @Public()
  async getService(@Param('id') id: string): Promise<Service> {
    return this.serviceService.getService(id);
  }

  @Post()
  @Public()
  @Roles(RoleCode.MANAGER)
  async createService(
    @Body() createServiceDTO: CreateServiceDTO,
  ): Promise<Service> {
    return this.serviceService.createService(createServiceDTO);
  }

  @Post('/bulk')
  @Public()
  @Roles(RoleCode.MANAGER)
  async createServices(@Body() services: CreateServiceDTO[]): Promise<{
    createdServices: Service[];
    failedServices: CreateServiceDTO[];
  }> {
    return this.serviceService.createServices(services);
  }

  @Put(':id')
  @Public()
  @Roles(RoleCode.MANAGER)
  async updateService(
    @Param('id') id: string,
    @Body() updateServiceDTO: UpdateServiceDTO,
  ): Promise<Service> {
    return this.serviceService.updateService(id, updateServiceDTO);
  }

  @Delete(':id')
  @Public()
  @Roles(RoleCode.MANAGER)
  async deleteService(@Param('id') id: string): Promise<Service> {
    return this.serviceService.deleteService(id);
  }
}
