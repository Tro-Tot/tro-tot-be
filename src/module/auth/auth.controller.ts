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
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginAuthDTO } from './dto/login-auth.dto';
import { apiSuccess, apiFailed } from 'src/common/api-response';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // @Post('login')
  // @UseGuards(AuthGuard('local'))
  // async login(@Body() body: LoginAuthDTO, @Request() req) {
  //   return r;
  // }
  @UseGuards(AuthGuard('local'))
  @Post('/login')
  async login(@Request() req) {
    try {
      return apiSuccess(200, req.user, 'Login success');
    } catch (e) {
      if (e.code === 'P2025') {
        return apiFailed(404, null, 'User not found');
      }
      return apiFailed(500, e, 'Internal server error');
    }
  }
}
