import { HttpStatus, Injectable } from '@nestjs/common';
import { Attachment, FileType, Prisma, Room, RoomStatus } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { I18nService } from 'nestjs-i18n';
import { PrismaService } from 'prisma/prisma.service';
import { PathConstants } from 'src/common/constant/path.constant';
import { apiFailed, apiSuccess } from 'src/common/dto/api-response';
import { ApiResponse } from 'src/common/dto/response.dto';
import { I18nTranslations } from 'src/i18n/generated/i18n.generated';
import { AttachmentService } from '../attachment/attachment.service';
import { UpdateAttachmentDto } from '../attachment/dto/update-attachment.dto';
import { ImageService } from '../image/image.service';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';

// Example: Extend Room
interface ExtendedRoom extends Room {
  customField: string; // You can add your own custom fields
}
const fieldTypes: {
  [key in keyof ExtendedRoom]?: 'number' | 'string' | 'boolean';
} = {
  numberOfBedrooms: 'number',
  customField: 'string',
  // Add other fields and their types here
};
@Injectable()
export class RoomService {
  constructor(
    private prismaService: PrismaService,
    private imageService: ImageService,
    private attachmentService: AttachmentService,
    private readonly i18n: I18nService<I18nTranslations>,
  ) {}

  async createRoomWithImage(
    createRoomDto: CreateRoomDto,
    file: Express.Multer.File[],
  ) {
    const room = await this.create(createRoomDto);

    if (!room) {
      return apiFailed(500, null, this.i18n.t('room.room_create_fail'));
    }

    const { successful, failed } =
      await this.imageService.handleArrayImagesWithoutApiResponse(
        file,
        room.id,
        PathConstants.ROOM_PATH,
      );

    const imagesUrl = await Promise.all(
      successful.map(async (image) => {
        const imageUrl = await this.imageService.getImageWithPathAndImageName(
          room.id,
          image.fileName,
          PathConstants.ROOM_PATH,
        );

        return {
          imageUrl,
          displayName: image.displayName,
          fileName: image.fileName,
        };
      }),
    );

    const attactmentDto: Attachment = {
      id: undefined,
      fileName: '',
      fileUrl: '',
      fileType: FileType.IMAGE,
      createdAt: undefined,
      updatedAt: undefined,
      deletedAt: undefined,
      houseId: undefined,
      displayName: '',
      roomId: room.id,
    };

    for (const image of imagesUrl) {
      attactmentDto.fileUrl = image.imageUrl;
      attactmentDto.displayName = image.displayName;
      attactmentDto.fileName = image.fileName;
      const result =
        await this.attachmentService.createAttachment(attactmentDto);
    }

    if (failed.length > 0) {
      //Mixed status code when some images failed
      return apiSuccess(
        207,
        {
          images: {
            successful,
            failed,
          },
          room,
        },
        this.i18n.t('room.room_create_fail'),
      );
    } else {
      return apiSuccess(
        201,
        {
          images: {
            successful,
            failed,
          },
          room,
        },
        this.i18n.t('room.room_create_success'),
      );
    }
  }

  async updateImage(
    attachmentId: string,
    updatedAttachment: UpdateAttachmentDto,
  ) {
    try {
      const result = await this.attachmentService.update(
        attachmentId,
        updatedAttachment,
      );
      return apiSuccess(HttpStatus.CREATED, result, 'Updated successfully');
    } catch (error) {
      throw error;
    }
  }

  async deletedImage(roomId: string, attachmentId: string) {
    try {
      const result = await this.attachmentService.deleteRoomAttachment(
        attachmentId,
        roomId,
      );
      if (!result) {
        return apiFailed(
          HttpStatus.INTERNAL_SERVER_ERROR,
          null,
          'Delete failed',
        );
      }

      //Try catch without throw to make sure ignore error
      try {
        await this.imageService.deleteImage(
          roomId,
          result.fileName,
          PathConstants.ROOM_PATH,
        );
      } catch (error) {}

      return apiSuccess(HttpStatus.CREATED, result, 'Updated successfully');
    } catch (error) {
      throw error;
    }
  }

  async create(createRoomDto: CreateRoomDto) {
    try {
      const room: Room = {
        ...createRoomDto,
        status: createRoomDto.status || RoomStatus.UNAVAILABLE,
        id: undefined,
        createdAt: undefined,
        updatedAt: undefined,
        deletedAt: undefined,
        description: createRoomDto.description || null,
        index: undefined,
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

  async findAllRoomByHouseId(
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
      const parsedPage = page ? page : 1;
      const parsedPageSize = pageSize ? pageSize : 10;
      if (
        isNaN(parsedPage) ||
        isNaN(parsedPageSize) ||
        parsedPage < 1 ||
        parsedPageSize < 1
      ) {
        return apiFailed(400, 'Invalid page or pageSize');
      }

      const skip = (parsedPage - 1) * parsedPageSize;
      const take = parsedPageSize;

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
          include: {
            attachments: true,
          },
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
    findOptions: Prisma.RoomFindManyArgs,
    houseId: string,
  ): Promise<ApiResponse> {
    try {
      const result = await this.prismaService.room.findMany({
        ...findOptions,
        where: {
          ...findOptions.where,
          houseId: houseId,
        },
      });
      return apiSuccess(200, { result }, 'Get rooms successfully');
    } catch (error) {
      console.error('Error fetching rooms:', error);
      throw new Error('Failed to fetch rooms');
    }
  }

  async uploadImages(roomId, files: Express.Multer.File[]) {
    try {
      const { successful, failed } =
        await this.imageService.handleArrayImagesWithoutApiResponse(
          files,
          roomId,
          PathConstants.ROOM_PATH,
        );

      const imagesUrl = await Promise.all(
        successful.map(async (image) => {
          const imageUrl = await this.imageService.getImageWithPathAndImageName(
            roomId,
            image.fileName,
            PathConstants.ROOM_PATH,
          );

          return {
            imageUrl,
            displayName: image.displayName,
            fileName: image.fileName,
          };
        }),
      );

      const attactmentDto: Attachment = {
        id: undefined,
        fileName: '',
        fileUrl: '',
        fileType: FileType.IMAGE,
        createdAt: undefined,
        updatedAt: undefined,
        deletedAt: undefined,
        houseId: undefined,
        displayName: '',
        roomId: roomId,
      };

      for (const image of imagesUrl) {
        attactmentDto.fileUrl = image.imageUrl;
        attactmentDto.displayName = image.displayName;
        attactmentDto.fileName = image.fileName;
        const result =
          await this.attachmentService.createAttachment(attactmentDto);
      }

      return apiSuccess(
        201,
        { successful, failed },
        this.i18n.t('room.room_image_upload_success'),
      );
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: string) {
    try {
      const result = await this.prismaService.room.findFirstOrThrow({
        where: {
          id,
        },
        include: {
          attachments: true,
        },
      });
      return apiSuccess(HttpStatus.OK, result, this.i18n.t('room.room_found'));
    } catch (error: any) {
      if (error instanceof PrismaClientKnownRequestError) {
        error.meta = error.meta || {};
        error.meta.property = 'roomId';
      } else {
        error.meta = error.meta || {};
      }
      error.meta.target = 'room';
      throw error;
    }
  }

  async update(id: string, updateRoomDto: UpdateRoomDto) {
    try {
      const updatedRomm = await this.prismaService.room.update({
        where: { id },
        data: updateRoomDto,
      });
      return apiSuccess(
        HttpStatus.CREATED,
        updatedRomm,
        this.i18n.t('room.room_updated'),
      );
    } catch (error) {}
  }

  remove(id: number) {
    return `This action removes a #${id} room`;
  }

  //TODO: need to check more to make sure can change status
  async updateRoomStatus(id: string, roomStatus: RoomStatus) {
    try {
      //Check if room exist
      const room = await this.prismaService.room.findFirstOrThrow({
        where: {
          id,
        },
      });

      switch (room.status) {
        case RoomStatus.AVAILABLE: {
          await this.handleUpdateRoomStatus(id, roomStatus);
          break;
        }
        case RoomStatus.OCCUPIED: {
          return apiFailed(
            HttpStatus.CONFLICT,
            this.i18n.t('room.room_status_occupied_conflict'),
          );
        }
        case RoomStatus.OUT_OF_SERVICE: {
          // Add your logic here
          break;
        }
        case RoomStatus.RESERVED: {
          // Add your logic here
          break;
        }
        case RoomStatus.UNAVAILABLE: {
          // Add your logic here
          break;
        }
        case RoomStatus.UNDER_MAINTENANCE: {
          // Add your logic here
          break;
        }
        default: {
          // Handle unexpected status
          break;
        }
      }

      //TODO: Notify

      //Change room status
    } catch (error) {
      throw error;
    }
  }

  handleUpdateRoomStatus(id: string, roomStatus: RoomStatus) {
    return this.prismaService.room.update({
      where: { id },
      data: {
        status: roomStatus,
      },
    });
  }
}
