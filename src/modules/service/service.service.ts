import { Prisma, Service } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';
import { CreateServiceDTO } from './dto/create-service.dto';
import { UpdateServiceDTO } from './dto/update-service.dto';

export class ServiceService {
  constructor(private readonly prismaService: PrismaService) {}

  async getServices(): Promise<Service[]> {
    return this.prismaService.service.findMany();
  }

  async getService(id: string): Promise<Service> {
    return this.prismaService.service.findUnique({
      where: { id },
    });
  }

  async createService(service: CreateServiceDTO): Promise<Service> {
    return this.prismaService.service.create({
      data: service,
    });
  }

  async createServices(createServiceDTOs: CreateServiceDTO[]): Promise<{
    createdServices: Service[];
    failedServices: CreateServiceDTO[];
  }> {
    let createdServices: Service[] = [];
    let failedServices: CreateServiceDTO[] = [];
    Promise.all(
      createServiceDTOs.map(async (service) => {
        try {
          const createdService = await this.prismaService.service.create({
            data: service,
          });
          createdServices.push(createdService);
        } catch (error) {
          failedServices.push(service);
        }
      }),
    );
    return { createdServices, failedServices };
  }

  async updateService(
    id: string,
    updateServiceDTO: UpdateServiceDTO,
  ): Promise<Service> {
    return this.prismaService.service.update({
      where: { id },
      data: updateServiceDTO,
    });
  }

  async deleteService(id: string): Promise<Service> {
    return this.prismaService.service.delete({
      where: { id },
    });
  }
}
