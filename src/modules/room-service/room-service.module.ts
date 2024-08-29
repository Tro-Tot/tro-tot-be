import { Module } from '@nestjs/common';
import { PrismaModule } from 'prisma/prisma.module';
import { RoomServiceController } from './room-service.controller';
import { RoomServiceService } from './room-service.service';

@Module({
  controllers: [RoomServiceController],
  imports: [PrismaModule],
  providers: [RoomServiceService],
})
export class RoomServiceModule {}
