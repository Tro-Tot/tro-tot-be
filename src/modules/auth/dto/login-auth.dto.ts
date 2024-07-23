import { IsNotEmpty, IsString } from 'class-validator';

export class LoginAuthDTO {
  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsString()
  password: string;
}
