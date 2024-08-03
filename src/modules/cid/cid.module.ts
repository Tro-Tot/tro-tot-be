import { Module } from '@nestjs/common';
import { CidService } from './cid.service';
import { CidController } from './cid.controller';
import { PrismaService } from 'prisma/prisma.service';

@Module({
  controllers: [CidController],
  providers: [CidService, PrismaService],
  exports: [CidService],
})
export class CidModule {}
