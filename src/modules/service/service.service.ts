import { Prisma, Service } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';

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

  async createService(service: Service): Promise<Service> {
    return this.prismaService.service.create({
      data: service,
    });
  }

  async createServices(
    services: Service[],
  ): Promise<{ createdServices: Service[]; failedServices: Service[] }> {
    let createdServices: Service[] = [];
    let failedServices: Service[] = [];
    Promise.all(
      services.map(async (service) => {
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

  async updateService(id: string, service: Service): Promise<Service> {
    return this.prismaService.service.update({
      where: { id },
      data: service,
    });
  }

  async deleteService(id: string): Promise<Service> {
    return this.prismaService.service.delete({
      where: { id },
    });
  }
}
