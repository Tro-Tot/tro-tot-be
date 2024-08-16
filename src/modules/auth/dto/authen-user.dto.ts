import { ApiProperty } from '@nestjs/swagger';
import { RoleCode, User } from '@prisma/client';
import { IsUUID } from 'class-validator';

export class AuthenUser {
  @ApiProperty()
  @IsUUID()
  id: string;

  @ApiProperty()
  user: User;

  @ApiProperty()
  role: RoleCode;

  @ApiProperty()
  accessToken: string;

  @ApiProperty()
  refreshToken: string;
}
