import { Module } from '@nestjs/common';
import { RoomService } from './room.service';
import { RoomController } from './room.controller';
import { PrismaModule } from 'prisma/prisma.module';

@Module({
  controllers: [RoomController],
  imports: [PrismaModule],
  providers: [RoomService],
})
export class RoomModule {}
