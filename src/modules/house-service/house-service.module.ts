import { Module } from '@nestjs/common';
import { PrismaModule } from 'prisma/prisma.module';
import { HouseModule } from '../house/house.module';
import { HouseServiceController } from './house-service.controller';
import { HouseServiceService } from './house-service.service';
import { IsHouseServiceExistValidator } from './validator/is-house-service-exist.validator';

@Module({
  controllers: [HouseServiceController],
  imports: [PrismaModule, HouseModule],
  providers: [HouseServiceService, IsHouseServiceExistValidator],
  exports: [HouseServiceService],
})
export class HouseServiceModule {}
