import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, IsUrl } from 'class-validator';

export class SendResetPasswordDTO {
  @ApiProperty()
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  @IsUrl()
  clientUrl: string;
}
