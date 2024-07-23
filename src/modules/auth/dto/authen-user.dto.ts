import { User } from '@prisma/client';

export class AuthenUser {
  id: string;
  user: User;
  accessToken: string;
  refreshToken: string;
}
