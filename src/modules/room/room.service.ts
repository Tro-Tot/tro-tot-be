import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateRoomDto } from './dto/create-room.dto';
import { UpdateRoomDto } from './dto/update-room.dto';
import { Attachment, FileType, Prisma, Room } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';
import { apiSuccess } from 'src/common/dto/api-response';
import { ApiResponse } from 'src/common/dto/response.dto';
import { ImageService } from '../image/image.service';
import { PathConstants } from 'src/common/constant/path.constant';
import { ImageResponse } from '../image/dto/image-response.dto';
import { AttachmentService } from '../attachment/attachment.service';
import { CreateAttachmentDto } from '../attachment/dto/create-attachment.dto';
@Injectable()
export class RoomService {
  constructor(
    private prismaService: PrismaService,
    private imageService: ImageService,
    private attachmentService: AttachmentService,
  ) {}

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
            fileName: image.fileName,
          };
        }),
      );

      const attactmentDto: any = {
        id: undefined,
        fileName: '',
        fileUrl: '',
        fileType: FileType.IMAGE,
        createdAt: undefined,
        updatedAt: undefined,
        deletedAt: undefined,
        houseId: undefined,
      };

      for (const image of imagesUrl) {
        attactmentDto.fileUrl = image.imageUrl;
        attactmentDto.fileName = image.fileName;
        const result =
          await this.attachmentService.createAttachment(attactmentDto);
        console.log(result);
      }

      return apiSuccess(
        201,
        { successful, failed },
        'Upload Image successfully',
      );
    } catch (error) {}
  }

  async findOne(id: string) {
    console.log(id);
    const result = await this.prismaService.room.findFirst({
      where: {
        id,
      },
    });
    console.log(result);
    return result;
  }

  update(id: number, updateRoomDto: UpdateRoomDto) {
    return `This action updates a #${id} room`;
  }

  remove(id: number) {
    return `This action removes a #${id} room`;
  }
}
