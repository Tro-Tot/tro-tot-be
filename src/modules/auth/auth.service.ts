import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { UserService } from '../user/user.service';
import { LoginAuthDTO } from './dto/login-auth.dto';
import { apiFailed, apiSuccess } from 'src/common/dto/api-response';
import * as bcrypt from 'bcrypt';
import {
  PrismaClient,
  RefreshToken,
  Renter,
  RoleCode,
  User,
} from '@prisma/client';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { RefreshTokenService } from '../refresh-token/refresh-token.service';
import { AuthenUser } from './dto/authen-user.dto';
import { Logout } from './dto/logout.dto';
import { BlacklistTokenService } from '../blacklist-token/blacklist-token.service';
import { SignUpDTO } from './dto/sign-up.dto';
import { PrismaService } from 'prisma/prisma.service';
import { CidService } from '../cid/cid.service';
import { CidDTO } from '../cid/dto/cid.dto';
import { MailService } from '../mail/mail.service';
import { OtpService } from '../otp/otp.service';
import { ApiResponse } from 'src/common/dto/response.dto';
import { RoleService } from '../role/role.service';

@Injectable()
export class AuthService {
  async loginAdmin(body: LoginAuthDTO) {
    try {
      const user = await this.userService.findOneByUserName(body.username);
      if (!user) {
        return apiFailed(404, 'Account not found');
      }
      const isMatch = await this.validatePassword(user.password, body.password);

      if (isMatch) {
        //Change to admin late
        //Check Role
        const checkIsRenter = await this.prisma.renter.findFirst({
          where: {
            userId: user.id,
          },
        });

        if (!checkIsRenter) {
          return apiFailed(404, 'Account not found');
        }

        //Generate JWT
        const accessToken = await this.generateAccessToken(user);
        const refreshTokenResult =
          await this.refreshTokenService.generateRefreshToken(user);

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

  async loginRenter(body: LoginAuthDTO) {
    try {
      const user = await this.userService.findOneByUserName(body.username);
      if (!user) {
        return apiFailed(404, 'Account not found');
      }
      const isMatch = await this.validatePassword(user.password, body.password);

      if (isMatch) {
        //Check Role
        const checkIsRenter = await this.prisma.renter.findFirst({
          where: {
            userId: user.id,
          },
        });

        if (!checkIsRenter) {
          return apiFailed(404, 'Account not found');
        }

        //Generate JWT
        const accessToken = await this.generateAccessToken(user);
        const refreshTokenResult =
          await this.refreshTokenService.generateRefreshToken(user);

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

  async loginLandlord(body: LoginAuthDTO) {
    try {
      const user = await this.userService.findOneByUserName(body.username);
      if (!user) {
        return apiFailed(404, 'Account not found');
      }
      const isMatch = await this.validatePassword(user.password, body.password);

      if (isMatch) {
        //Check Role
        const checkIsRenter = await this.prisma.landLord.findFirst({
          where: {
            userId: user.id,
          },
        });

        if (!checkIsRenter) {
          return apiFailed(404, 'Account not found');
        }

        //Generate JWT
        const accessToken = await this.generateAccessToken(user);
        const refreshTokenResult =
          await this.refreshTokenService.generateRefreshToken(user);

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

  async loginStaff(body: LoginAuthDTO) {
    try {
      const user = await this.userService.findOneByUserName(body.username);
      if (!user) {
        return apiFailed(404, 'Account not found');
      }
      const isMatch = await this.validatePassword(user.password, body.password);

      if (isMatch) {
        //Check role
        const checkIsRenter = await this.prisma.staff.findFirst({
          where: {
            userId: user.id,
          },
        });

        if (!checkIsRenter) {
          return apiFailed(404, 'Account not found');
        }

        //Generate JWT
        const accessToken = await this.generateAccessToken(user);
        const refreshTokenResult =
          await this.refreshTokenService.generateRefreshToken(user);

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

  async loginManager(body: LoginAuthDTO) {
    try {
      const user = await this.userService.findOneByUserName(body.username);
      const isMatch = await this.validatePassword(user.password, body.password);

      const checkIsRenter = await this.prisma.manager.findFirst({
        where: {
          userId: user.id,
        },
      });

      if (!checkIsRenter) {
        return apiFailed(404, 'Access denied');
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

  async loginTechnicalStaff(body: LoginAuthDTO) {
    try {
      const user = await this.userService.findOneByUserName(body.username);
      const isMatch = await this.validatePassword(user.password, body.password);

      const checkIsRenter = await this.prisma.technicalStaff.findFirst({
        where: {
          userId: user.id,
        },
      });

      if (!checkIsRenter) {
        return apiFailed(404, 'Account not found');
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

  constructor(
    private userService: UserService,
    private config: ConfigService,
    private jwtService: JwtService,
    private blackListTokenService: BlacklistTokenService,
    private refreshTokenService: RefreshTokenService,
    private cidService: CidService,
    private roleService: RoleService,
    private prisma: PrismaService,
    private readonly mailService: MailService,
    private readonly otpService: OtpService,
  ) {}
  async registerManager(user: SignUpDTO) {
    // Ensure the transaction either succeeds or fails completely
    return await this.prisma.$transaction(async (prisma) => {
      try {
        //Hash user's password
        user.password = await this.hashPassword(user.password);

        // TEST: apply Manager role id
        const role = await this.roleService.findRoleByCode(RoleCode.MANAGER);
        user.roleId = role.id;

        //Create User type
        const userInput: User = {
          username: user.username,
          email: user.email,
          phoneNumber: user.phoneNumber,
          password: user.password,
          firstName: user.firstName,
          lastName: user.lastName,
          dateOfBirth: user.dateOfBirth,
          gender: user.gender,
          avatarUrl: '',
          isVerified: false,
          isDeleted: undefined,
          createdAt: undefined,
          updatedAt: undefined,
          roleId: user.roleId,
          cidId: undefined,
          id: undefined,
          status: undefined,
        };
        //Save the renter in DB
        const userResult = await this.prisma.user.create({ data: userInput });
        if (!userResult) {
          return apiFailed(400, 'Created User failed');
        }
        //Create the renter schema
        const renter: Renter = {
          id: undefined,
          userId: userResult.id,
          createdAt: undefined,
          updatedAt: undefined,
        };

        const renterResult = await this.prisma.manager.create({
          data: renter,
        });
        if (!renterResult) {
          return apiFailed(400, 'Created User failed');
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
    });
  }

  async registerTechnicalStaff(user: SignUpDTO) {
    // Ensure the transaction either succeeds or fails completely
    return await this.prisma.$transaction(async (prisma) => {
      try {
        //Hash user's password
        user.password = await this.hashPassword(user.password);

        // TEST: apply Technical Staff role id
        const role = await this.roleService.findRoleByCode(
          RoleCode.TECHNICAL_STAFF,
        );
        user.roleId = role.id;

        //Create User type
        const userInput: User = {
          username: user.username,
          email: user.email,
          phoneNumber: user.phoneNumber,
          password: user.password,
          firstName: user.firstName,
          lastName: user.lastName,
          dateOfBirth: user.dateOfBirth,
          gender: user.gender,
          avatarUrl: '',
          isVerified: false,
          isDeleted: undefined,
          createdAt: undefined,
          updatedAt: undefined,
          roleId: user.roleId,
          cidId: undefined,
          id: undefined,
          status: undefined,
        };
        //Save the renter in DB
        const userResult = await this.prisma.user.create({ data: userInput });
        if (!userResult) {
          return apiFailed(400, 'Created User failed');
        }
        //Create the renter schema
        const renter: Renter = {
          id: undefined,
          userId: userResult.id,
          createdAt: undefined,
          updatedAt: undefined,
        };

        const renterResult = await this.prisma.technicalStaff.create({
          data: renter,
        });
        if (!renterResult) {
          return apiFailed(400, 'Created User failed');
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
    });
  }

  async registerStaff(user: SignUpDTO) {
    // Ensure the transaction either succeeds or fails completely
    return await this.prisma.$transaction(async (prisma) => {
      try {
        //Hash user's password
        user.password = await this.hashPassword(user.password);

        // TEST: apply Staff role id
        const role = await this.roleService.findRoleByCode(RoleCode.STAFF);
        user.roleId = role.id;

        //Create User type
        const userInput: User = {
          username: user.username,
          email: user.email,
          phoneNumber: user.phoneNumber,
          password: user.password,
          firstName: user.firstName,
          lastName: user.lastName,
          dateOfBirth: user.dateOfBirth,
          gender: user.gender,
          avatarUrl: '',
          isVerified: false,
          isDeleted: undefined,
          createdAt: undefined,
          updatedAt: undefined,
          roleId: user.roleId,
          cidId: undefined,
          id: undefined,
          status: undefined,
        };
        //Save the renter in DB
        const userResult = await this.prisma.user.create({ data: userInput });
        if (!userResult) {
          return apiFailed(400, 'Created User failed');
        }
        //Create the renter schema
        const renter: Renter = {
          id: undefined,
          userId: userResult.id,
          createdAt: undefined,
          updatedAt: undefined,
        };

        const renterResult = await this.prisma.staff.create({ data: renter });
        if (!renterResult) {
          return apiFailed(400, 'Created User failed');
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
    });
  }

  async registerLandlord(user: SignUpDTO) {
    // Ensure the transaction either succeeds or fails completely
    return await this.prisma.$transaction(async (prisma) => {
      try {
        //Hash user's password
        user.password = await this.hashPassword(user.password);

        // TEST: apply landlord role id
        const role = await this.roleService.findRoleByCode(RoleCode.LANDLORD);
        user.roleId = role.id;

        //Create User type
        const userInput: User = {
          username: user.username,
          email: user.email,
          phoneNumber: user.phoneNumber,
          password: user.password,
          firstName: user.firstName,
          lastName: user.lastName,
          dateOfBirth: user.dateOfBirth,
          gender: user.gender,
          avatarUrl: '',
          isVerified: false,
          isDeleted: undefined,
          createdAt: undefined,
          updatedAt: undefined,
          roleId: user.roleId,
          cidId: undefined,
          id: undefined,
          status: undefined,
        };
        //Save the renter in DB
        const userResult = await this.prisma.user.create({ data: userInput });
        if (!userResult) {
          return apiFailed(400, 'Created User failed');
        }
        //Create the renter schema
        const renter: Renter = {
          id: undefined,
          userId: userResult.id,
          createdAt: undefined,
          updatedAt: undefined,
        };

        const renterResult = await this.prisma.landLord.create({
          data: renter,
        });
        if (!renterResult) {
          return apiFailed(400, 'Created User failed');
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
    });
  }

  async registerRenter(user: SignUpDTO) {
    // Ensure the transaction either succeeds or fails completely
    return await this.prisma.$transaction(async (prisma) => {
      try {
        //Hash user's password
        user.password = await this.hashPassword(user.password);

        //Apply renter role id
        const role = await this.roleService.findRoleByCode(RoleCode.RENTER);
        user.roleId = role.id;

        //Create User type
        const userInput: User = {
          username: user.username,
          email: user.email,
          phoneNumber: user.phoneNumber,
          password: user.password,
          firstName: user.firstName,
          lastName: user.lastName,
          dateOfBirth: user.dateOfBirth,
          gender: user.gender,
          avatarUrl: '',
          isVerified: false,
          isDeleted: undefined,
          createdAt: undefined,
          updatedAt: undefined,
          roleId: user.roleId,
          id: undefined,
          status: undefined,
          cidId: null,
        };
        //Save the renter in DB
        const userResult = await this.prisma.user.create({ data: userInput });
        if (!userResult) {
          return apiFailed(400, 'Created User failed');
        }
        //Create the renter schema
        const renter: Renter = {
          id: undefined,
          userId: userResult.id,
          createdAt: undefined,
          updatedAt: undefined,
        };

        const renterResult = await this.prisma.renter.create({ data: renter });
        if (!renterResult) {
          return apiFailed(400, 'Created User failed');
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
    });
  }

  async login(body: LoginAuthDTO) {
    try {
      const user = await this.userService.findOneByUserName(body.username);
      const isMatch = await this.validatePassword(user.password, body.password);

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
      return apiSuccess(400, {}, 'Logout failed');
    }
  }

  generateAccessToken(user: { id: string; roleId: string }) {
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
      return apiFailed(400, 'Email already registered');
    }
    return await this.otpService.sendOTP(email);
  }

  async verifyOtp(email: string, otp: string) {
    const isVerified = await this.otpService.verifyOTP(email, otp);
    return apiSuccess(
      200,
      { isVerified },
      isVerified ? 'OTP verified' : 'OTP not verified',
    );
  }
}
