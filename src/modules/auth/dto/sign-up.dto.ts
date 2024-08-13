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
import { ApiProperty } from '@nestjs/swagger';

enum Gender {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
  OTHER = 'OTHER',
}

export class SignUpDTO {
  @ApiProperty({
    type: String,
    description: 'Email of the user',
    required: true,
    example: 'nguyenphigv23@gmail.com',
    pattern: '^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$',
  })
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  phone_number: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  password: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  first_name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  last_name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  username: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsDateString()
  date_of_birth: Date;

  @ApiProperty()
  @IsNotEmpty()
  @IsEnum(Gender)
  gender: Gender;

  // @IsNotEmpty()
  // @ValidateNested()
  // @Type(() => CidDTO)
  // cid: CidDTO;

  @ApiProperty()
  @IsOptional()
  @IsString()
  avatar_url?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  status?: string;

  @ApiProperty()
  @IsOptional()
  @IsUUID()
  role_id?: string;

  @ApiProperty()
  @IsOptional()
  @IsUUID()
  cid_id?: string;
}
