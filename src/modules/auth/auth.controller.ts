import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Request,
  Delete,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginAuthDTO } from './dto/login-auth.dto';
import { apiSuccess, apiFailed } from 'src/common/dto/api-response';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { RefreshTokenStrategy } from './strategy/refresh-token.stategy';
import { GetUser } from './decorator/get_user.decorator';
import { AuthenUser } from './dto/authen-user.dto';
import { Logout } from './dto/logout.dto';
import { SignUpDTO } from './dto/sign-up.dto';
import { SendResetPasswordDTO } from './dto/send-reset-password.dto';
import { ResetPasswordDTO } from './dto/reset-password.dto';
import { EmailDTO } from './dto/email.dto';
import { VerifyOtpDTO } from './dto/verify-otp.dto';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // @Post('login')
  // @UseGuards(AuthGuard('local'))
  // async login(@Body() body: LoginAuthDTO, @Request() req) {
  //   return r;
  // }
  @Post('/login')
  @UsePipes(new ValidationPipe())
  login(@Body() body: LoginAuthDTO) {
    return this.authService.login(body);
  }

  @Post('/renter/login')
  @UsePipes(new ValidationPipe())
  renterLogin(@Body() body: LoginAuthDTO) {
    return this.authService.loginRenter(body);
  }

  @Post('/manager/login')
  @UsePipes(new ValidationPipe())
  managerLogin(@Body() body: LoginAuthDTO) {
    return this.authService.loginManager(body);
  }

  @Post('/staff/login')
  @UsePipes(new ValidationPipe())
  staffLogin(@Body() body: LoginAuthDTO) {
    return this.authService.loginStaff(body);
  }

  @Post('/technical-staff/login')
  @UsePipes(new ValidationPipe())
  technicalStaffLogin(@Body() body: LoginAuthDTO) {
    return this.authService.loginTechnicalStaff(body);
  }

  @Post('/admin/login')
  @UsePipes(new ValidationPipe())
  adminLogin(@Body() body: LoginAuthDTO) {
    return this.authService.loginAdmin(body);
  }

  @Post('/landlord/login')
  @UsePipes(new ValidationPipe())
  landlordLogin(@Body() body: LoginAuthDTO) {
    return this.authService.loginRenter(body);
  }

  //SIGN UP FLOW
  @Post('/sign-up/renter')
  @UsePipes(new ValidationPipe())
  renterSignUp(@Body() body: SignUpDTO) {
    return this.authService.registerGeneral(body, RoleCode.RENTER);
  }

  @Post('/sign-up/landlord')
  @UsePipes(new ValidationPipe())
  landlordSignUp(@Body() body: SignUpDTO) {
    return this.authService.registerGeneral(body, RoleCode.LANDLORD);
  }

  //To-do: Need Authen Manager to do this
  @Post('/sign-up/staff')
  @UsePipes(new ValidationPipe())
  staffSignUp(@Body() body: SignUpDTO) {
    return this.authService.registerGeneral(body, RoleCode.STAFF);
  }

  //To-do: Need Authen Manager to do this
  @Post('/sign-up/technical-staff')
  @UsePipes(new ValidationPipe())
  technicalStaffSignUp(@Body() body: SignUpDTO) {
    return this.authService.registerGeneral(body, RoleCode.TECHNICAL_STAFF);
  }

  //To-do: Need Authen Manager to do this
  @Post('/sign-up/manager')
  @UsePipes(new ValidationPipe())
  managerSignUp(@Body() body: SignUpDTO) {
    return this.authService.registerGeneral(body, RoleCode.MANAGER);
  }

  @Get('/refresh-token')
  @UseGuards(AuthGuard('jwt-refresh'))
  refreshToken(@GetUser() user: AuthenUser) {
    return this.authService.refreshToken(user.refreshToken, user.id);
  }

  @Post('/logout')
  @UseGuards(AuthGuard('jwt'))
  logout(@GetUser() user: AuthenUser, @Body() logoutBody: Logout) {
    return this.authService.handleLogout(user, logoutBody);
  }

  @Post('/send-verify-otp')
  async sendVerifyOtp(@Body() emailDTO: EmailDTO) {
    return this.authService.sendVerifyOtp(emailDTO.email);
  }

  @Post('/verify-otp')
  async verifyOtp(@Body() verifyOtpDTO: VerifyOtpDTO) {
    return this.authService.verifyOtp(verifyOtpDTO.email, verifyOtpDTO.otp);
  }

  @Post('/send-reset-password')
  async getResetPassword(@Body() sendResetPasswordDTO: SendResetPasswordDTO) {
    return this.authService.sendResetPasswordEmail(
      sendResetPasswordDTO.email,
      sendResetPasswordDTO.clientUrl,
    );
  }

  @Post('/reset-password')
  async resetPassword(@Body() resetPasswordDTO: ResetPasswordDTO) {
    return this.authService.resetPassword(
      resetPasswordDTO.token,
      resetPasswordDTO.newPassword,
    );
  }
}
