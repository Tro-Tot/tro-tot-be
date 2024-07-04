import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { LoginAuthDTO } from './dto/login-auth.dto';

@Injectable()
export class AuthService {
  login(body: LoginAuthDTO) {
    return this.validateUser(body.username, body.password);
  }
  constructor(private userService: UserService) {}
  async validateUser(username: string, password: string) {
    try {
      const user = await this.userService.findOneByUserName(username);
      if (user && user.password === password) {
        const { password, ...result } = user;
        return result;
      }
      return null;
    } catch (e) {
      throw e;
    }
  }
}
