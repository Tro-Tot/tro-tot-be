import { Prisma, Service, ServiceType } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';
import { CreateServiceDTO } from './dto/create-service.dto';
import { UpdateServiceDTO } from './dto/update-service.dto';
import { SortByEnum } from 'src/common/enum/sort-by.enum';

export class ServiceService {
  constructor(private readonly prismaService: PrismaService) {}

  async getServices(): Promise<Service[]> {
    return this.prismaService.service.findMany();
  }

  //Phi Doing
  async searchServices(
    pageSize: number = 10,
    pageNumber: number = 0,
    sortBy: string = undefined,
    sortOrder: SortByEnum,
    houseId: string,
    serviceScheduleId: string,
    serviceName: string,
    servicePrice: number,
    serviceType: ServiceType,
    unit: string,
    billCycle: number,
    isCompulsory: boolean,
    isManual: boolean,
    status: string,
  ) {
    const services = await this.prismaService.service.findMany({
      where: {
        OR: [],
      },
      take: pageSize,
      skip: pageNumber,
    });
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
