import { Module } from '@nestjs/common';
import { HouseServiceService } from './house-service.service';
import { HouseServiceController } from './house-service.controller';
import { PrismaModule } from 'prisma/prisma.module';
import { HouseModule } from '../house/house.module';

@Module({
  controllers: [HouseServiceController],
  imports: [PrismaModule, HouseModule],
  providers: [HouseServiceService],
})
export class HouseServiceModule {}
