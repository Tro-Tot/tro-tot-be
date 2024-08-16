import { Injectable } from '@nestjs/common';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { Room } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class RoomService {
  constructor(private prismaService: PrismaService) {}

  async create(createRoomDto: CreateRoomDto) {
    try {
      const room: Room = {
        ...createRoomDto,
        attachmentId: undefined,
        isOccupied: createRoomDto.isOccupied || false,
        status: createRoomDto.status || 'active',
        id: '',
        index: 0,
        createdAt: undefined,
        updatedAt: undefined,
        deletedAt: undefined,
        description: '',
      };

      // Truyền đối tượng room trực tiếp mà không sử dụng spread
      const roomResult = await this.prismaService.room.create({
        data: room, // Truyền dữ liệu vào hàm create của Prisma
      });

      return roomResult;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  findAll() {
    return `This action returns all room`;
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
