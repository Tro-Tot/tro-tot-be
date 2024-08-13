import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class ResetPasswordDTO {
  @ApiProperty()
  @IsString()
  token: string;

  @ApiProperty()
  @IsString()
  newPassword: string;
}
