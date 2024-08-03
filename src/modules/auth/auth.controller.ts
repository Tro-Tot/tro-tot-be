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

  @Post('/sign-up/renter')
  @UsePipes(new ValidationPipe())
  renterSignUp(@Body() body: SignUpDTO) {
    return this.authService.registerRenter(body);
  }

  @Post('/sign-up/landlord')
  @UsePipes(new ValidationPipe())
  landlordSignUp(@Body() body: SignUpDTO) {
    return this.authService.registerRenter(body);
  }

  //To-do: Need Authen Manager to do this
  @Post('/sign-up/staff')
  @UsePipes(new ValidationPipe())
  staffSignUp(@Body() body: SignUpDTO) {
    return this.authService.registerRenter(body);
  }

  //To-do: Need Authen Manager to do this
  @Post('/sign-up/technical-staff')
  @UsePipes(new ValidationPipe())
  technicalStaffSignUp(@Body() body: SignUpDTO) {
    return this.authService.registerRenter(body);
  }

  //To-do: Need Authen Manager to do this
  @Post('/sign-up/manager')
  @UsePipes(new ValidationPipe())
  managerSignUp(@Body() body: SignUpDTO) {
    return this.authService.registerRenter(body);
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
}
