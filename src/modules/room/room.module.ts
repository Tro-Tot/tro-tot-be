import { Module } from '@nestjs/common';
import { RoomService } from './room.service';
import { RoomController } from './room.controller';
import { PrismaModule } from 'prisma/prisma.module';
import { ImageModule } from '../image/image.module';
import { AttachmentModule } from '../attachment/attachment.module';

@Module({
  controllers: [RoomController],
  imports: [PrismaModule, ImageModule, AttachmentModule],
  providers: [RoomService],
})
export class RoomModule {}
