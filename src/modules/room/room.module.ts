import { Module } from '@nestjs/common';
import { PrismaModule } from 'prisma/prisma.module';
import { AttachmentModule } from '../attachment/attachment.module';
import { HouseService } from '../house/house.service';
import { ImageModule } from '../image/image.module';
import { RoomController } from './room.controller';
import { RoomService } from './room.service';
import { IsRoomExistValidator } from './validator/is-room-exist.validator';

@Module({
  controllers: [RoomController],
  imports: [PrismaModule, ImageModule, AttachmentModule],
  providers: [RoomService, HouseService, IsRoomExistValidator],
})
export class RoomModule {}
