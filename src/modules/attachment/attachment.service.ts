import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateAttachmentDto } from './dto/create-attachment.dto';
import { UpdateAttachmentDto } from './dto/update-attachment.dto';
import { PrismaService } from 'prisma/prisma.service';
import { Attachment } from '@prisma/client';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

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
          houseId: undefined,
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
