import { Module } from '@nestjs/common';
import { HouseController } from './house.controller';
import { HouseService } from './house.service';
import { PrismaService } from 'prisma/prisma.service';
import { IsHouseExist } from './pipe/is-house-exist';

@Module({
  imports: [],
  controllers: [HouseController],
  providers: [PrismaService, HouseService],
  exports: [HouseService, IsHouseExist],
})
export class HouseModule {}
