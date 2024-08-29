import { HttpStatus, Injectable } from '@nestjs/common';
import { HouseServiceStatus, Prisma } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';
import { apiFailed, apiSuccess } from 'src/common/dto/api-response';
import { CreateHouseServiceDto } from './dto/create-house-service.dto';
import { UpdateHouseServiceDto } from './dto/update-house-service.dto';

@Injectable()
export class HouseServiceService {
  updateHouseService(updateHouseServiceDto: UpdateHouseServiceDto) {
    //Todo: after finish room service logic to check availabity of service subscription
  }
  constructor(private prismaService: PrismaService) {}
  async create(createHouseServiceDto: CreateHouseServiceDto) {
    const houseService: Prisma.HouseServiceCreateInput = {
      service: {
        connect: {
          id: createHouseServiceDto.serviceId,
        },
      },
      house: {
        connect: {
          id: createHouseServiceDto.houseId,
        },
      },
    };
    const result = await this.prismaService.houseService.create({
      data: houseService,
    });
    return result;
  }

  async findAllBasedOnHouseId(houseId: string) {
    const result = await this.prismaService.houseService.findMany({
      where: {
        houseId,
      },
      include: {
        service: true,
      },
    });
    console.log(result);
    return apiSuccess(HttpStatus.OK, result, 'House Service List');
  }

  findOne = async (id: string) => {
    const result = await this.prismaService.houseService.findFirstOrThrow({
      where: {
        id,
      },
      include: {
        service: true,
      },
    });
    return apiSuccess(HttpStatus.OK, result, 'House Service Details');
  };

  //The remove is now change the Status to terminated
  //Doesn't apply the deletedAt because they wont let us enable or even create it again
  remove(id: string) {
    const result = this.prismaService.houseService.update({
      where: {
        id,
      },
      data: {
        status: HouseServiceStatus.TERMINATED,
      },
    });
    return apiSuccess(HttpStatus.OK, result, 'House Service Disabled');
  }

  //Need to validate Service Usage
  changeHouseServiceStatus(houseServiceId: string, status: HouseServiceStatus) {
    if (status === HouseServiceStatus.TERMINATED) {
      return apiFailed(
        HttpStatus.BAD_REQUEST,
        'Cannot set status to TERMINATED',
      );
    }

    const result = this.prismaService.houseService.update({
      where: {
        id: houseServiceId,
      },
      data: {
        status,
      },
    });
    return apiSuccess(HttpStatus.OK, result, 'House Service Disabled');
  }
}
