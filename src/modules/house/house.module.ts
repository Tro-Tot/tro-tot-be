import { Module } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { AttachmentModule } from '../attachment/attachment.module';
import { ImageModule } from '../image/image.module';
import { HouseController } from './house.controller';
import { HouseService } from './house.service';
import { IsHouseExistPipe } from './pipe/is-house-exist.pipe';

@Module({
  imports: [AttachmentModule, ImageModule],
  controllers: [HouseController],
  providers: [PrismaService, HouseService, IsHouseExistPipe],
  exports: [HouseService, IsHouseExistPipe],
})
export class HouseModule {}
