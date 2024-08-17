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
      console.log(createAttachmentDto);
      const result = await this.prismaService.attachment.create({
        data: {
          fileName: createAttachmentDto.fileName,
          fileType: createAttachmentDto.fileType,
          fileUrl: createAttachmentDto.fileUrl,
          roomId: createAttachmentDto.roomId,
          houseId: undefined,
        },
      });
      console.log(result);
      return result;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }

  findAll() {
    return `This action returns all attachment`;
  }

  findOne(id: number) {
    return `This action returns a #${id} attachment`;
  }

  update(id: number, updateAttachmentDto: UpdateAttachmentDto) {
    return `This action updates a #${id} attachment`;
  }

  remove(id: number) {
    return `This action removes a #${id} attachment`;
  }
}
