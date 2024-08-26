import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import {
  Prisma,
  PrismaClient,
  RefreshToken,
  Role,
  RoleCode,
  User,
} from '@prisma/client';
import { DefaultArgs } from '@prisma/client/runtime/library';
import * as bcrypt from 'bcrypt';
import { I18nService, I18nValidationError } from 'nestjs-i18n';
import { PrismaService } from 'prisma/prisma.service';
import { apiFailed, apiSuccess } from 'src/common/dto/api-response';
import { ApiResponse } from 'src/common/dto/response.dto';
import { I18nTranslations } from 'src/i18n/generated/i18n.generated';
import { BlacklistTokenService } from '../blacklist-token/blacklist-token.service';
import { MailService } from '../mail/mail.service';
import { OtpService } from '../otp/otp.service';
import { RefreshTokenService } from '../refresh-token/refresh-token.service';
import { RoleService } from '../role/role.service';
import { UserService } from '../user/user.service';
import { AuthenUser } from './dto/authen-user.dto';
import { LoginAuthDTO } from './dto/login-auth.dto';
import { Logout } from './dto/logout.dto';
import { SignUpDTO } from './dto/sign-up.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private config: ConfigService,
    private jwtService: JwtService,
    private blackListTokenService: BlacklistTokenService,
    private refreshTokenService: RefreshTokenService,
    private roleService: RoleService,
    private prisma: PrismaService,
    private readonly mailService: MailService,
    private readonly otpService: OtpService,
    private readonly i18n: I18nService<I18nTranslations>,
  ) {}

  async loginGeneral(body: LoginAuthDTO, role: RoleCode) {
    try {
      const user = await this.handleFindUser(body.email);
      if (!user) {
        const error: I18nValidationError[] = [
          {
            property: 'email',
            target: { body },
            constraints: {
              isEmailExist: this.i18n.t('auth.email_not_found'),
            },
            children: [],
          },
        ];
        return apiFailed(404, this.i18n.t('auth.email_not_found'), error);
      }
      const isMatch = await this.validatePassword(user.password, body.password);

      const checkRoleSchema = await this.checkRoleSchema(user.id, role);

      if (!checkRoleSchema) {
        const error: I18nValidationError[] = [
          {
            property: 'role',
            target: { body },
            constraints: {
              isRole: this.i18n.t('auth.role_not_found'),
            },
            children: [],
          },
        ];

        return apiFailed(404, this.i18n.t('auth.account_not_found'), error);
      }

      if (isMatch) {
        const accessToken = await this.generateAccessToken(user);
        const refreshTokenResult =
          await this.refreshTokenService.generateRefreshToken(user);

        let refreshToken;
        if (refreshTokenResult?.refreshToken) {
          refreshToken = refreshTokenResult.refreshToken;
        }
        //If access token or refresh token is not generated
        if (accessToken === undefined || refreshToken === undefined) {
          const error: I18nValidationError[] = [
            {
              property: 'token',
              target: { body },
              constraints: {
                isToken: 'Token is not generated',
              },
              children: [],
            },
          ];
          return apiFailed(500, 'Token is not generated', error);
        }

        return apiSuccess(
          200,
          { accessToken, refreshToken, user },
          'Login success',
        );
      } else {
        const error: I18nValidationError[] = [
          {
            property: 'password',
            target: { body },
            value: body.password,
            constraints: {
              isMatch: this.i18n.t('auth.password_not_match'),
            },
            children: [],
          },
        ];
        return apiFailed(400, this.i18n.t('auth.password_not_match'), error);
      }
    } catch (e) {
      return apiFailed(500, e, 'Internal server error');
    }
  }

  //Use to check if roleSchema eg staffs, renters,... exist
  async checkRoleSchema(userId: string, role: RoleCode) {
    let checkRoleSchema = false;

    switch (role) {
      case RoleCode.RENTER: {
        checkRoleSchema = !!(await this.prisma.renter.findFirst({
          where: {
            userId: userId,
          },
        }));
        break;
      }
      case RoleCode.STAFF: {
        checkRoleSchema = !!(await this.prisma.staff.findFirst({
          where: {
            userId: userId,
          },
        }));
        break;
      }
      // Admin hasn't done yet
      case RoleCode.ADMIN: {
        // checkRoleSchema = !!(await this.prisma.staff.findFirst({
        //   where: {
        //     userId: userId,
        //   },
        // }));
        break;
      }
      case RoleCode.TECHNICAL_STAFF: {
        checkRoleSchema = !!(await this.prisma.technicalStaff.findFirst({
          where: {
            userId: userId,
          },
        }));
        break;
      }
      case RoleCode.MANAGER: {
        checkRoleSchema = !!(await this.prisma.manager.findFirst({
          where: {
            userId: userId,
          },
        }));
        break;
      }
      case RoleCode.LANDLORD: {
        checkRoleSchema = !!(await this.prisma.landLord.findFirst({
          where: {
            userId: userId,
          },
        }));
        break;
      }
      default: {
        checkRoleSchema = false;
        break;
      }
    }
    return checkRoleSchema;
  }

  async registerGeneral(user: SignUpDTO, roleInput: RoleCode) {
    // Ensure the transaction either succeeds or fails completely
    return await this.prisma.$transaction(
      async (prismaTransaction) => {
        try {
          //Hash user's password
          user.password = await this.hashPassword(user.password);

          //Apply renter role id
          const role = await this.roleService.findRoleByCode(roleInput);
          user.roleId = role.id;

          //Create User type
          const userInput: User = {
            ...user,
            id: undefined,
            isDeleted: false,
            isVerified: false,
            avatarUrl: user.avatarUrl || '',
            cidId: user.cidId || undefined,
            roleId: role.id,
            status: 'active',
            createdAt: undefined,
            updatedAt: undefined,
            deletedAt: undefined,
          };
          //Save the renter in DB
          const userResult = await prismaTransaction.user.create({
            data: {
              ...userInput,
            },
            include: {
              role: true, // Include the role object in the result
            },
          });
          if (!userResult) {
            return apiFailed(500, 'Created User failed');
          }

          const addRoleSchemaResult = await this.addRoleSchema(
            prismaTransaction,
            userResult.id,
            roleInput,
          );

          if (!addRoleSchemaResult) {
            throw new BadRequestException('Add role schema failed!');
          }

          const accessToken = await this.generateAccessToken(userResult);

          //Generate refresh token and store it
          const refreshTokenResult =
            await this.refreshTokenService.generateRefreshToken(userResult);

          let refreshToken;
          if (refreshTokenResult?.refreshToken) {
            refreshToken = refreshTokenResult.refreshToken;
          }

          return apiSuccess(
            201,
            { accessToken, refreshToken, user: userResult },
            'Created user successfully',
          );
        } catch (error) {
          throw error;
        }
      },
      {
        //After 10s will break
        timeout: 10000,
      },
    );
  }

  async addRoleSchema(
    prisma: Omit<
      PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>,
      '$connect' | '$disconnect' | '$on' | '$transaction' | '$use' | '$extends'
    >,
    userId: string,
    role: RoleCode,
  ) {
    try {
      const schema: any = {
        id: undefined,
        userId: userId,
        createdAt: undefined,
        updatedAt: undefined,
        deletedAt: undefined,
      };
      let result = null;
      switch (role) {
        case RoleCode.RENTER: {
          result = await prisma.renter.create({
            data: {
              ...schema,
            },
          });
          break;
        }
        case RoleCode.LANDLORD: {
          result = await prisma.landLord.create({
            data: {
              ...schema,
            },
          });
          break;
        }
        case RoleCode.MANAGER: {
          result = await prisma.manager.create({
            data: {
              ...schema,
            },
          });
          break;
        }
        case RoleCode.STAFF: {
          result = await prisma.staff.create({
            data: {
              ...schema,
            },
          });
          break;
        }
        case RoleCode.TECHNICAL_STAFF: {
          result = await prisma.technicalStaff.create({
            data: {
              ...schema,
            },
          });
          break;
        }

        default: {
          throw new BadRequestException('No role found!');
        }
      }
      return result;
    } catch (error) {
      throw error;
    }
  }

  async handleLogout(user: AuthenUser, logout: Logout) {
    try {
      const jwt = this.decodeJwt(user.accessToken);
      await this.blackListTokenService.createBlackListToken(
        user.accessToken,
        jwt.expiredAt,
      );
      const result = await this.refreshTokenService.updateRefreshTokenStatus(
        logout.refreshToken,
        false,
      );
      return apiSuccess(200, result, 'Logout successfully');
    } catch (e) {
      return apiSuccess(500, {}, 'Logout failed');
    }
  }

  generateAccessToken(user: { id: string; role?: Role }) {
    const accessTokenExpiresIn = this.config.get('JWT_ACCESS_TOKEN_EXPIRY');
    const secrect = this.config.get('JWT_SECRET');
    const accessToken = this.jwtService.sign(
      { userId: user.id, role: user.role.code },
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
        console.log(userId);
        console.log(refreshToken);
        const isRefreshTokenMatches =
          await this.refreshTokenService.validateRefreshToken(
            userId,
            refreshToken,
          );

        //Error if refresh token with status true not exist
        if (!isRefreshTokenMatches) {
          return apiFailed(401, 'Refresh token is invalid', 'UNAUTHORIZED');
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
      return apiFailed(403, 'Access Denied', 'ACCESS_DENIED');
    } catch (e) {
      if (e.code === 'P2025') {
        return apiFailed(401, 'Refresh token is invalid', 'UNAUTHORIZED');
      }
      return apiFailed(500, 'Internal server error', e);
    }
  }

  decodeJwt(jwt: string) {
    return this.jwtService.decode(jwt);
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
    if (!user) throw new BadRequestException('Email not registered');

    const resetPasswordToken = await this.generateResetPasswordToken(
      user.id,
      email,
    );

    const resetPasswordUrl = `${clientUrl}?token=${resetPasswordToken}`;

    await this.mailService.sendResetPassword(email, resetPasswordUrl);
    return apiSuccess(200, null, 'Email sent');
  }

  async handleFindUser(email: string) {
    return this.userService.findOne({
      email,
    });
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

  async isEmailExist(email: string): Promise<boolean> {
    const user = await this.userService.findOneByEmail(email);
    return user ? true : false;
  }

  async sendVerifyOtp(email: string): Promise<ApiResponse> {
    if (await this.isEmailExist(email)) {
      return apiFailed(409, 'Email already registered');
    }
    return await this.otpService.sendOTP(email);
  }

  async verifyOtp(email: string, otp: string) {
    return this.otpService.verifyOTP(email, otp);
  }
}
