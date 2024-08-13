import { ApiProperty } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { IsUUID } from 'class-validator';

export class AuthenUser {
  @ApiProperty()
  @IsUUID()
  id: string;

  @ApiProperty()
  user: User;

  @ApiProperty()
  accessToken: string;

  @ApiProperty()
  refreshToken: string;
}
