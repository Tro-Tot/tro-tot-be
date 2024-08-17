import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { Prisma, Room } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';
import { apiSuccess } from 'src/common/dto/api-response';
import { ApiResponse } from 'src/common/dto/response.dto';

@Injectable()
export class RoomService {
  constructor(private prismaService: PrismaService) {}

  async create(createRoomDto: CreateRoomDto) {
    try {
      const room: Room = {
        ...createRoomDto,
        isOccupied: createRoomDto.isOccupied || false,
        status: createRoomDto.status || 'active',
        id: undefined,
        index: 0,
        createdAt: undefined,
        updatedAt: undefined,
        deletedAt: undefined,
        description: createRoomDto.description || null,
      };

      const roomResult = await this.prismaService.room.create({
        data: room,
      });

      return roomResult;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  //TODO: Find all room by house id
  findAll() {
    return `This action returns all room`;
  }

  async findAllRoomByRoomId(
    params: {
      page?: number;
      pageSize?: number;
      cursor?: Prisma.RoomWhereUniqueInput;
      where?: Prisma.RoomWhereInput;
      orderBy?: Prisma.RoomOrderByWithRelationInput;
    },
    houseId: string,
  ): Promise<ApiResponse> {
    try {
      let { page = 1, pageSize = 10, cursor, where, orderBy } = params;

      // Ensure page and pageSize are valid
      if (page < 1) page = 1;
      if (pageSize < 1) pageSize = 10;

      const skip = (page - 1) * pageSize;
      const take = pageSize;

      const [result, total] = await Promise.all([
        this.prismaService.room.findMany({
          skip,
          take,
          cursor,
          where: {
            ...where,
            houseId: houseId,
          },
          orderBy,
        }),
        this.prismaService.room.count({
          where: {
            ...where,
            houseId: houseId,
          },
        }),
      ]);

      return apiSuccess(200, { result, total }, 'Get rooms successfully');
    } catch (error) {
      console.error('Error fetching rooms:', error);
      throw new Error('Failed to fetch rooms');
    }
  }

  //Test general
  async findAllRoomByRoomIdGeneral(
    query: Record<string, string>,
    houseId: string,
  ): Promise<ApiResponse> {
    try {
      const { page, pageSize, cursor, orderBy, ...filters } = query;

      // Ensure page and pageSize are valid
      const parsedPage = page ? parseInt(page, 10) : 1;
      const parsedPageSize = pageSize ? parseInt(pageSize, 10) : 10;
      if (
        isNaN(parsedPage) ||
        isNaN(parsedPageSize) ||
        parsedPage < 1 ||
        parsedPageSize < 1
      ) {
        throw new HttpException(
          'Invalid page or pageSize',
          HttpStatus.BAD_REQUEST,
        );
      }

      const skip = (parsedPage - 1) * parsedPageSize;
      const take = parsedPageSize;

      const whereCondition: Prisma.RoomWhereInput = { houseId };

      Object.entries(filters).forEach(([key, value]) => {
        if (key in Prisma.RoomScalarFieldEnum) {
          whereCondition[key] = value;
        }
      });

      const [result, total] = await Promise.all([
        this.prismaService.room.findMany({
          skip,
          take,
          where: whereCondition,
          orderBy: orderBy ? JSON.parse(orderBy) : undefined,
          include: { house: true },
        }),
        this.prismaService.room.count({ where: whereCondition }),
      ]);

      return apiSuccess(200, { result, total }, 'Get rooms successfully');
    } catch (error) {
      console.error('Error fetching rooms:', error);
      throw new Error('Failed to fetch rooms');
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} room`;
  }

  update(id: number, updateRoomDto: UpdateRoomDto) {
    return `This action updates a #${id} room`;
  }

  remove(id: number) {
    return `This action removes a #${id} room`;
  }
}
