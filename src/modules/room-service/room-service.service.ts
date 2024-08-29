import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { I18nService, I18nValidationError } from 'nestjs-i18n';
import { PrismaService } from 'prisma/prisma.service';
import { apiFailed, apiSuccess } from 'src/common/dto/api-response';
import { I18nTranslations } from 'src/i18n/generated/i18n.generated';
import { CreateRoomServiceDto } from './dto/create-room-service.dto';
import { UpdateRoomServiceDto } from './dto/update-room-service.dto';

@Injectable()
export class RoomServiceService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly i18n: I18nService<I18nTranslations>,
  ) {}

  async addServiceToRoom(createRoomServiceDto: CreateRoomServiceDto) {
    try {
      console.log('asdasd');
      let errors: I18nValidationError[] = [];

      //Check if room and house service in the same house
      const room = await this.prismaService.room.findFirstOrThrow({
        where: { id: createRoomServiceDto.roomId },
      });

      const houseService =
        await this.prismaService.houseService.findFirstOrThrow({
          where: {
            id: createRoomServiceDto.houseServiceId,
          },
        });

      if (room.houseId != houseService.houseId) {
        let roomIdError: I18nValidationError = {
          property: 'roomId',
        };
        errors.push(roomIdError);

        let houseServiceIdError: I18nValidationError = {
          property: 'houseServiceId',
        };
        errors.push(houseServiceIdError);

        return apiFailed(
          400,
          this.i18n.translate('room-service.house_id_not_match'),
          errors,
        );
      }

      const roomServiceInput: Prisma.RoomServiceCreateInput = {
        houseService: {
          connect: { id: createRoomServiceDto.houseServiceId },
        },
        room: {
          connect: { id: createRoomServiceDto.roomId },
        },
      };

      const result = await this.prismaService.roomService.create({
        data: roomServiceInput,
        include: {
          houseService: true,
        },
      });

      if (result) {
        return apiSuccess(
          201,
          result,
          this.i18n.translate('room-service.add_room_service_successfully'),
        );
      }

      return apiFailed(500, 'room-service.add_room_service_failed');
    } catch (error) {
      throw error;
    }
  }

  async getServiceBasedOnroomId(
    roomId: string,
    findOptions: Prisma.RoomServiceFindManyArgs,
  ) {
    try {
      const result = await this.prismaService.roomService.findMany({
        ...findOptions,
        where: {
          ...findOptions.where,
          roomId: roomId,
        },
      });

      return apiSuccess(
        200,
        result,
        this.i18n.translate('room-service.find_successfully'),
      );
    } catch (error) {
      throw error;
    }
  }

  async updateRoomService(updateRoomServiceDto: UpdateRoomServiceDto) {}
  async deleteRoomService(roomId: string) {}

  //Todo: method to check valid to change room service status
  async checkRoomServiceStatus() {}
}
