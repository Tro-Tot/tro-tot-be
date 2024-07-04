import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { ApiTags } from '@nestjs/swagger';
import { apiSuccess, apiFailed } from 'src/common/api-response';

@Controller('user')
@ApiTags('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/by-username')
  async findOneByUserName(@Body() body: { username: string }) {
    try {
      const result = await this.userService.findOneByUserName(body.username);
      if (result) {
        return apiSuccess(200, result, 'Get user by username success');
      } else {
        return apiFailed(404, null, 'User not found');
      }
    } catch (e) {
      if (e.code === 'P2025') {
        return apiFailed(404, null, 'User not found');
      }
      return apiFailed(500, e, 'Internal server error');
    }
  }
}
