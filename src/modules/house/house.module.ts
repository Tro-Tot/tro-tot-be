import { Module } from '@nestjs/common';
import { HouseController } from './house.controller';
import { HouseService } from './house.service';
import { PrismaService } from 'prisma/prisma.service';

@Module({
  imports: [],
  controllers: [HouseController],
  providers: [PrismaService, HouseService],
  exports: [],
})
export class HouseModule {}
