import { Injectable } from '@nestjs/common';
import { CreateBlacklistTokenDto } from './dto/create-blacklist-token.dto';
import { UpdateBlacklistTokenDto } from './dto/update-blacklist-token.dto';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class BlacklistTokenService {
  constructor(private readonly prisma: PrismaService) {}

  createBlackListToken = (token: string) => {
    console.log(token);
    return this.prisma.blacklistToken.create({
      data: {
        token,
      },
    });
  };

  isTokenBlacklisted = async (token: string) => {
    const blackListToken = await this.prisma.blacklistToken.findFirst({
      where: {
        token,
      },
    });
    return blackListToken ? true : false;
  };
}
