import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { User } from '@prisma/client';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  findOneByUserId(userId: string) {
    return this.prisma.user.findFirstOrThrow({
      where: {
        id: userId,
      },
    });
  }
  // updateRefreshToken(id: string, refreshToken: string) {
  //   return this.prisma.user.update({
  //     where: {
  //       id: id,
  //     },
  //     data: {
  //       refreshToken: refreshToken,
  //     },
  //   });
  // }
  findOneByUserName(usernameInput: string) {
    return this.prisma.user.findFirstOrThrow({
      where: {
        username: usernameInput,
      },
      include: {
        role: true,
      },
    });
  }

  async validateUser(username: string, password: string) {
    return await this.prisma.user.findFirst({
      where: {
        AND: [
          {
            name: username,
            password: password,
          },
        ],
      },
    });
  }
}
