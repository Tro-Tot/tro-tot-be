import { Injectable } from '@nestjs/common';
import { CreateRefreshTokenDto } from './dto/create-refresh-token.dto';
import { UpdateRefreshTokenDto } from './dto/update-refresh-token.dto';
import { Prisma, PrismaClient, RefreshToken } from '@prisma/client';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class RefreshTokenService {
  updateRefreshTokenStatus(refreshTokenInput: string, arg1: boolean) {
    return this.prisma.refreshToken.update({
      where: {
        refreshToken: refreshTokenInput,
      },
      data: {
        status: false,
      },
    });
  }
  constructor(
    private prisma: PrismaService,
    private config: ConfigService,
    private jwtService: JwtService,
  ) {}

  generateRefreshToken(user: {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    deletedAt: Date | null;
    email: string;
    name: string | null;
    roleId: string;
    password: string;
    username: string;
  }) {
    const refreshTokenExpiresIn = this.config.get('JWT_REFRESH_TOKEN_EXPIRY');
    const secrect = this.config.get('JWT_REFRESH_SECRET');
    const refreshTokenResult = this.jwtService.sign(
      { userId: user.id, role: user.roleId },
      { secret: secrect, expiresIn: refreshTokenExpiresIn },
    );

    if (refreshTokenResult) {
      const refreshToken: Prisma.RefreshTokenCreateInput = {
        userId: user.id,
        refreshToken: refreshTokenResult,
      };
      const result = this.prisma.refreshToken.create({
        data: refreshToken,
      });
      if (result) {
        return result;
      }
    }
    return null;
  }

  async validateRefreshToken(userIdInput: string, refreshTokenInput: string) {
    const refreshTokenResult = await this.prisma.refreshToken.findFirst({
      where: {
        userId: userIdInput,
        refreshToken: refreshTokenInput,
        status: true,
      },
    });
    return !!refreshTokenResult;
  }
}
