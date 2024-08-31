import { HttpStatus, Injectable } from '@nestjs/common';
import { Attachment, FileType, Prisma } from '@prisma/client';
import { I18nService } from 'nestjs-i18n';
import { PrismaService } from 'prisma/prisma.service';
import { PathConstants } from 'src/common/constant/path.constant';
import { apiSuccess } from 'src/common/dto/api-response';
import { AttachmentService } from '../attachment/attachment.service';
import { ImageService } from '../image/image.service';
import { CreateHouseDTO } from './dto/create-house.dto';

@Injectable()
export class HouseService {
  constructor(
    private readonly prismaService: PrismaService,
    private readonly attachmentService: AttachmentService,
    private readonly imageService: ImageService,
    private readonly i18nService: I18nService,
  ) {}
  async findAll() {
    return this.prismaService.house.findMany({
      include: {
        rooms: true,
        cooperativeContract: true,
        houseServices: true,
        attachments: true,
      },
    });
  }

  async findFirst(id: string) {
    return this.prismaService.house.findFirst({
      where: {
        id: id,
      },
      include: {
        rooms: true,
        cooperativeContract: true,
        houseServices: true,
        attachments: true,
      },
    });
  }

  async findUnique(id: string) {
    return this.prismaService.house.findUnique({
      where: {
        id: id,
      },
      include: {
        rooms: true,
        cooperativeContract: true,
        houseServices: true,
        attachments: true,
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

  async uploadImages(houseId, files: Express.Multer.File[]) {
    const { successful, failed } =
      await this.imageService.handleArrayImagesWithoutApiResponse(
        files,
        houseId,
        PathConstants.HOUSE_PATH,
      );

    const imagesUrl = await Promise.all(
      successful.map(async (image) => {
        const imageUrl = await this.imageService.getImageWithPathAndImageName(
          houseId,
          image.fileName,
          PathConstants.HOUSE_PATH,
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
      houseId: houseId,
      displayName: '',
      roomId: undefined,
    };

    for (const image of imagesUrl) {
      attactmentDto.fileUrl = image.imageUrl;
      attactmentDto.displayName = image.displayName;
      attactmentDto.fileName = image.fileName;
      const result =
        await this.attachmentService.createAttachment(attactmentDto);
    }

    return apiSuccess(
      HttpStatus.CREATED,
      { successful, failed },
      this.i18nService.t('house.house_image_upload_success'),
    );
  }

  async deleteImage(roomId: string, attachmentId: string) {
    const result = await this.attachmentService.deleteHouseAttachment(
      attachmentId,
      roomId,
    );
    // if (!result) {
    //   return apiFailed(HttpStatus.INTERNAL_SERVER_ERROR, null, 'Delete on bucket failed');
    // }

    try {
      await this.imageService.deleteImage(
        roomId,
        result.fileName,
        PathConstants.ROOM_PATH,
      );
    } catch (error) {
      //ignore error
    }

    return apiSuccess(
      HttpStatus.CREATED,
      result,
      this.i18nService.t('house.house_image_delete_success'),
    );
  }
}
