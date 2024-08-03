import {
  IsNotEmpty,
  IsString,
  IsEmail,
  IsDate,
  IsEnum,
  IsOptional,
  IsUUID,
  isObject,
  ValidateNested,
  IsDateString,
} from 'class-validator';
import { CidDTO } from '../../cid/dto/cid.dto';
import { Type } from 'class-transformer';

enum Gender {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
  OTHER = 'OTHER',
}

export class SignUpDTO {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  phone_number: string;

  @IsNotEmpty()
  @IsString()
  password: string;

  @IsNotEmpty()
  @IsString()
  first_name: string;

  @IsNotEmpty()
  @IsString()
  last_name: string;

  @IsNotEmpty()
  @IsString()
  username: string;

  @IsNotEmpty()
  @IsDateString()
  date_of_birth: Date;

  @IsNotEmpty()
  @IsEnum(Gender)
  gender: Gender;

  // @IsNotEmpty()
  // @ValidateNested()
  // @Type(() => CidDTO)
  // cid: CidDTO;

  @IsOptional()
  @IsString()
  avatar_url?: string;

  @IsOptional()
  @IsString()
  status?: string;

  @IsOptional()
  @IsUUID()
  role_id?: string;

  @IsOptional()
  @IsUUID()
  cid_id?: string;
}
