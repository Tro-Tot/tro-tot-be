import { Module } from '@nestjs/common';
import { PrismaModule } from 'prisma/prisma.module';
import { AttachmentModule } from '../attachment/attachment.module';
import { HouseServiceModule } from '../house-service/house-service.module';
import { HouseService } from '../house/house.service';
import { ImageModule } from '../image/image.module';
import { RoomServiceModule } from '../room-service/room-service.module';
import { RoomController } from './room.controller';
import { RoomService } from './room.service';
import { IsRoomExistValidator } from './validator/is-room-exist.validator';

@Module({
  controllers: [RoomController],
  imports: [
    PrismaModule,
    ImageModule,
    AttachmentModule,
    RoomServiceModule,
    HouseServiceModule,
  ],
  providers: [RoomService, HouseService, IsRoomExistValidator],
})
export class RoomModule {}
