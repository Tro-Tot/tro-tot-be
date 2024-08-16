import { SetMetadata } from '@nestjs/common';
import { Role, RoleCode } from '@prisma/client';

export const ROLES_KEY = 'roles';
export const Roles = (...roles: RoleCode[]) => {
  return SetMetadata(ROLES_KEY, roles);
};
