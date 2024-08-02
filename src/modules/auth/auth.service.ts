import { BadRequestException, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { LoginAuthDTO } from './dto/login-auth.dto';
import { apiFailed, apiSuccess } from 'src/common/dto/api-response';
import * as bcrypt from 'bcrypt';
import { RefreshToken, User } from '@prisma/client';
import { config } from 'process';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { RefreshTokenService } from '../refresh-token/refresh-token.service';
import { date } from 'zod';
import { AuthenUser } from './dto/authen-user.dto';
import { Logout } from './dto/logout.dto';
import { BlacklistTokenService } from '../blacklist-token/blacklist-token.service';
import { MailService } from '../mail/mail.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private config: ConfigService,
    private jwtService: JwtService,
    private blackListTokenService: BlacklistTokenService,
    private refreshTokenService: RefreshTokenService,
    private readonly mailService: MailService,
  ) {}

  async login(body: LoginAuthDTO) {
    try {
      const user = await this.userService.findOneByUserName(body.username);
      const isMatch = await this.validatePassword(user.password, body.password);
      if (isMatch) {
        const accessToken = await this.generateAccessToken(user);
        const refreshTokenResult =
          await this.refreshTokenService.generateRefreshToken(user);

        // const today = new Date();
        // const startDate = new Date(today.getFullYear(), 6, 2);
        // console.log('startDate', startDate);
        // console.log('usser', user.createdAt);
        // console.log('today', today);
        // const timeDifference = today.getTime() - user.createdAt.getTime();
        // console.log(timeDifference / (1000 * 60 * 60 * 24));
        // console.log(today.getTimezoneOffset());
        // console.log(refreshTokenResult.createdAt);
        // const daysPassed = Math.floor(timeDifference / (1000 * 60 * 60 * 24));

        // console.log(
        //   `Số ngày đã qua từ ngày 02/07 đến hôm nay là: ${daysPassed} ngày`,
        // );

        let refreshToken;
        if (refreshTokenResult?.refreshToken) {
          refreshToken = refreshTokenResult.refreshToken;
        }
        //If access token or refresh token is not generated
        if (accessToken === undefined || refreshToken === undefined) {
          return apiFailed(
            500,
            'Internal server error',
            'Internal server error',
          );
        }

        return apiSuccess(
          200,
          { accessToken, refreshToken, user },
          'Login success',
        );
      } else {
        return apiFailed(401, 'Password not match', ['password']);
      }
    } catch (e) {
      if (e.code === 'P2025') {
        return apiFailed(404, 'User not found', ['username']);
      }
      console.log(e);
      return apiFailed(500, e, 'Internal server error');
    }
  }

  async handleLogout(user: AuthenUser, logout: Logout) {
    try {
      await this.blackListTokenService.createBlackListToken(user.accessToken);
      const result = await this.refreshTokenService.updateRefreshTokenStatus(
        logout.refreshToken,
        false,
      );
      return apiSuccess(200, result, 'Logout successfully');
    } catch (e) {
      return apiSuccess(400, {}, 'Logout failed');
    }
  }

  generateAccessToken(user: {
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
    const accessTokenExpiresIn = this.config.get('JWT_ACCESS_TOKEN_EXPIRY');
    const secrect = this.config.get('JWT_SECRET');
    const accessToken = this.jwtService.sign(
      { userId: user.id, role: user.roleId },
      { secret: secrect, expiresIn: accessTokenExpiresIn },
    );
    return accessToken;
  }

  async validatePassword(password, bodyPassword: string) {
    const isMatch = await bcrypt.compare(bodyPassword, password);
    return isMatch;
  }

  async hashPassword(password: string) {
    try {
      console.log(this.config.get('BCRYPT_SALT_ROUNDS'));
      const saltRounds = Number(this.config.get('BCRYPT_SALT_ROUNDS'));
      const hash = await bcrypt.hash(password, saltRounds);
      return hash;
    } catch (e) {
      console.log(e);
    }
  }

  //Refresh token function
  async refreshToken(refreshToken: string, userId: string) {
    try {
      const user = await this.userService.findOneByUserId(userId);
      if (user) {
        const isRefreshTokenMatches =
          await this.refreshTokenService.validateRefreshToken(
            userId,
            refreshToken,
          );

        //Error if refresh token with status true not exist
        if (!isRefreshTokenMatches) {
          return apiFailed(400, 'Refresh token is invalid', null);
        }

        //Change status of old refreshToken to false
        await this.refreshTokenService.updateRefreshTokenStatus(
          refreshToken,
          false,
        );

        //Generate new token
        const accessToken = await this.generateAccessToken(user);
        const newRefreshToken: RefreshToken =
          await this.refreshTokenService.generateRefreshToken(user);

        //If can't generate token
        if (!accessToken && !newRefreshToken) {
          return apiFailed(500, 'Server error can not generate token', null);
        }

        return apiSuccess(
          200,
          { accessToken, refreshToken: newRefreshToken.refreshToken },
          'Refresh token successfully',
        );
      }
      return apiFailed(403, 'Access Denied', null);
    } catch (e) {
      if (e.code === 'P2025') {
        return apiFailed(400, 'Refresh token is invalid', null);
      }
      return apiFailed(400, 'Refresh token is invalid', e);
    }
  }

  private async generateResetPasswordToken(userId: string, email: string) {
    const token = this.jwtService.sign(
      { userId, email },
      { secret: this.config.get('JWT_SECRET'), expiresIn: '30m' },
    );

    return token;
  }

  async sendResetPasswordEmail(email: string, clientUrl: string) {
    const user = await this.userService.findOneByEmail(email);
    if (!user) throw new BadRequestException('Email not found');

    const resetPasswordToken = await this.generateResetPasswordToken(
      user.id,
      email,
    );

    const resetPasswordUrl = `${clientUrl}?token=${resetPasswordToken}`;

    await this.mailService.sendResetPassword(email, resetPasswordUrl);
    return apiSuccess(200, null, 'Email sent');
  }

  async resetPassword(token: string, newPassword: string) {
    const { userId, email } = this.jwtService.verify(token, {
      secret: this.config.get('JWT_SECRET'),
    });

    const user = await this.userService.findOneByUserId(userId);
    if (!user) throw new BadRequestException('User not found');

    const hashPassword = await this.hashPassword(newPassword);
    await this.userService.updatePassword(userId, hashPassword);

    return apiSuccess(200, null, 'Password reset successfully');
  }
}
