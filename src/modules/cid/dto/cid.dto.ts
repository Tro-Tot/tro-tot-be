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
  issuingAuthority: string;

  @IsNotEmpty()
  @IsDateString()
  issueDate: Date;

  @IsNotEmpty()
  @IsString()
  registeredAddress: string;

  @IsNotEmpty()
  @IsUUID()
  userId: string;
}
