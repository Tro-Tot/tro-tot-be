import { Module } from '@nestjs/common';
import { AttachmentService } from './attachment.service';
import { AttachmentController } from './attachment.controller';
import { PrismaModule } from 'prisma/prisma.module';

@Module({
  controllers: [AttachmentController],
  imports: [PrismaModule],
  providers: [AttachmentService],
  exports: [AttachmentService],
})
export class AttachmentModule {}
