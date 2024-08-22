import { ApiProperty } from '@nestjs/swagger';
import { RoleCode, User } from '@prisma/client';
import { IsUUID } from 'class-validator';
import {
  IsEnumCustom,
  IsUUIDCustom,
} from 'src/common/decorator/class-validator-custom.decorator';

export class AuthenUser {
  @ApiProperty()
  @IsUUIDCustom()
  id: string;

  @ApiProperty()
  user: User;

  @ApiProperty()
  @IsEnumCustom(RoleCode)
  role: RoleCode;

  @ApiProperty()
  accessToken: string;

  @ApiProperty()
  refreshToken: string;
}
