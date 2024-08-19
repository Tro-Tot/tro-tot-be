import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { AttachmentService } from '../attachment.service';

@Injectable()
export class IsAttachmentExist implements PipeTransform {
  constructor(private attachmentService: AttachmentService) {}
  async transform(value: string) {
    //The error is already throw in method findOne
    const isAttachmentExist = !!(await this.attachmentService.findOne(value));

    //Just for sure
    if (!isAttachmentExist) {
      throw new BadRequestException('Attachment is not exist');
    }
    return value;
  }
}
