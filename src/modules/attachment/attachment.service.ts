import { Injectable } from '@nestjs/common';
import { Attachment } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';
import { UpdateAttachmentDto } from './dto/update-attachment.dto';

@Injectable()
export class AttachmentService {
  constructor(private prismaService: PrismaService) {}

  async createAttachment(createAttachmentDto: Attachment) {
    try {
      const result = await this.prismaService.attachment.create({
        data: {
          fileName: createAttachmentDto.fileName,
          fileType: createAttachmentDto.fileType,
          fileUrl: createAttachmentDto.fileUrl,
          displayName: createAttachmentDto.displayName,
          roomId: createAttachmentDto.roomId,
          houseId: createAttachmentDto.houseId,
        },
      });
      return result;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  update(id: string, updateAttachmentDto: UpdateAttachmentDto) {
    return this.prismaService.attachment.update({
      where: {
        id,
      },
      data: updateAttachmentDto,
    });
  }

  delete(id: string) {
    return this.prismaService.attachment.delete({
      where: { id },
    });
  }

  deleteRoomAttachment(id: string, roomId: string) {
    return this.prismaService.attachment.delete({
      where: { id: id, roomId: roomId },
    });
  }

  deleteHouseAttachment(id: string, houseId: string) {
    return this.prismaService.attachment.delete({
      where: { id: id, houseId: houseId },
    });
  }

  async findOne(id: string) {
    try {
      return this.prismaService.attachment.findFirstOrThrow({
        where: { id },
      });
    } catch (error) {
      throw error;
    }
  }
}
