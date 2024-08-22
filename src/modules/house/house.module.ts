import { Module } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { HouseController } from './house.controller';
import { HouseService } from './house.service';
import { IsHouseExist } from './pipe/is-house-exist';

@Module({
  imports: [],
  controllers: [HouseController],
  providers: [PrismaService, HouseService, IsHouseExist],
  exports: [HouseService, IsHouseExist],
})
export class HouseModule {}
