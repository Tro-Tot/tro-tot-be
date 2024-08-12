import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaService } from 'prisma/prisma.service';
import { ImageModule } from '../image/image.module';

@Module({
  controllers: [UserController],
  imports: [ImageModule],
  providers: [UserService, PrismaService],
  exports: [UserService],
})
export class UserModule {}
