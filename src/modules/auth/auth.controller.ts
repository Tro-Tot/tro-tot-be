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
import { SendResetPasswordDTO } from './dto/send-reset-password.dto';
import { ResetPasswordDTO } from './dto/reset-password.dto';

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
