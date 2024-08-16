import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role, RoleCode } from '@prisma/client';
import { ROLES_KEY } from '../decorator/roles.decorator';
import { GetUser } from '../decorator/get_user.decorator';
import { AuthenUser } from 'src/modules/auth/dto/authen-user.dto';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const requiredRoles = this.reflector.getAllAndOverride<RoleCode[]>(
      ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );
    if (!requiredRoles) {
      return true;
    }
    const request = context.switchToHttp().getRequest();

    const user: AuthenUser = request.user;
    console.log(user);
    return requiredRoles.some((role) => user.role?.includes(role));
  }
}
