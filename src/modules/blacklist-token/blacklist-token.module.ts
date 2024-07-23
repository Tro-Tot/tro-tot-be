import { Module } from '@nestjs/common';
import { BlacklistTokenService } from './blacklist-token.service';
import { BlacklistTokenController } from './blacklist-token.controller';
import { PrismaService } from 'prisma/prisma.service';

@Module({
  controllers: [BlacklistTokenController],
  providers: [BlacklistTokenService, PrismaService],
})
export class BlacklistTokenModule {}
