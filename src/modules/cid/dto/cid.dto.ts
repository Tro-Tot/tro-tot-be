import {
  IsNotEmpty,
  IsString,
  IsDate,
  IsOptional,
  IsUUID,
  IsDateString,
} from 'class-validator';

export class CidDTO {
  @IsOptional()
  @IsUUID()
  id?: string;

  @IsNotEmpty()
  @IsString()
  number: string;

  @IsNotEmpty()
  @IsString()
  issuing_authority: string;

  @IsNotEmpty()
  @IsDateString()
  issue_date: Date;

  @IsNotEmpty()
  @IsString()
  registered_address: string;

  @IsNotEmpty()
  @IsUUID()
  user_id: string;
}
