import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNumber, IsString, Length, Max, Min } from 'class-validator';

export class VerifyOtpDTO {
  @ApiProperty()
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  @Length(6, 6)
  otp: string;
}
