import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from 'prisma/prisma.service';
import { User } from '@prisma/client';

@Injectable()
export class UserService {
  async findOneByUserName(username: string) {
    try {
      return await this.prisma.user.findFirstOrThrow({
        where: {
          name: username,
        },
      });
    } catch (e) {
      if (e.code === 'P2025') {
        throw e;
      }
      throw e;
    }
  }
  constructor(private prisma: PrismaService) {}

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
