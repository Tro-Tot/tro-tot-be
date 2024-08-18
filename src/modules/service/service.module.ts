import { Module } from '@nestjs/common';
import { ServiceController } from './service.controller';
import { ServiceService } from './service.service';
import { PrismaService } from 'prisma/prisma.service';

@Module({
  imports: [],
  controllers: [ServiceController],
  providers: [PrismaService, ServiceService],
  exports: [],
})
export class ServiceModule {}
