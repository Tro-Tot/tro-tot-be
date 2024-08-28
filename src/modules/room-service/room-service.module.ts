import { Module } from '@nestjs/common';
import { RoomServiceService } from './room-service.service';
import { RoomServiceController } from './room-service.controller';

@Module({
  controllers: [RoomServiceController],
  providers: [RoomServiceService],
})
export class RoomServiceModule {}
