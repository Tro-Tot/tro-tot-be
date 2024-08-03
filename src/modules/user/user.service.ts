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
            username: username,
            password: password,
          },
        ],
      },
    });
  }

  async findOneByEmail(email: string) {
    return await this.prisma.user.findFirst({
      where: {
        email: email,
      },
    });
  }

  async updatePassword(id: string, newPassword: string) {
    return await this.prisma.user.update({
      where: {
        id: id,
      },
      data: {
        password: newPassword,
      },
    });
  }
}
