import { Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateHouseDTO } from './dto/create-house.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class HouseService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll() {
    return this.prismaService.house.findMany({
      include: {
        rooms: true,
        cooperativeContract: true,
        houseServices: true,
      },
    });
  }

  async findOne(id: string) {
    return this.prismaService.house.findUnique({
      where: {
        id: id,
      },
      include: {
        rooms: true,
        cooperativeContract: true,
        houseServices: true,
      },
    });
  }

  async create(createHouseDTO: CreateHouseDTO) {
    const data: Prisma.HouseCreateInput = createHouseDTO;
    return this.prismaService.house.create({
      data: data,
    });
  }

  async createMany(createHouseDTOs: CreateHouseDTO[]) {
    let createdHouses: Prisma.HouseCreateInput[] = [];
    let failedHouses: CreateHouseDTO[] = [];
    Promise.all(
      createHouseDTOs.map(async (house) => {
        try {
          const data: Prisma.HouseCreateInput = house;
          createdHouses.push(data);
        } catch (error) {
          failedHouses.push(house);
        }
      }),
    );
    return {
      createdHouses: createdHouses,
      failedHouses: failedHouses,
    };
  }

  async update(id: string, updateHouseDTO: CreateHouseDTO) {
    const data: Prisma.HouseUpdateInput = updateHouseDTO;
    return this.prismaService.house.update({
      where: {
        id: id,
      },
      data: data,
    });
  }

  async delete(id: string) {
    return this.prismaService.house.delete({
      where: {
        id: id,
      },
    });
  }

  async isHouseOfStaff(houseId: string, staffId: string) {
    return this.prismaService.house.findFirst({
      where: {
        id: houseId,
        staff: {
          id: staffId,
        },
      },
    });
  }
}
