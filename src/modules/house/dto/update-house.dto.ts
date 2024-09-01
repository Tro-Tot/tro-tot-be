import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import {
  IsNotEmptyCustom,
  IsNumberCustom,
  IsStringCustom,
  MinCustom,
  MinLengthCustom,
} from 'src/common/decorator/class-validator-custom.decorator';

export class UpdateHouseDTO {
  @ApiProperty()
  @IsOptional()
  @IsStringCustom()
  cooperativeContractId: string;

  @ApiProperty()
  @IsOptional()
  @MinLengthCustom(3)
  @IsNotEmptyCustom()
  @IsStringCustom()
  name: string;

  @ApiProperty()
  @IsOptional()
  @IsNotEmptyCustom()
  @IsStringCustom()
  city: string;

  @ApiProperty()
  @IsOptional()
  @IsNotEmptyCustom()
  @IsStringCustom()
  district: string;

  @ApiProperty()
  @IsOptional()
  @IsNotEmptyCustom()
  @IsStringCustom()
  ward: string;

  @ApiProperty()
  @IsOptional()
  @IsNotEmptyCustom()
  @IsStringCustom()
  street: string;

  @ApiProperty()
  @IsOptional()
  @IsNotEmptyCustom()
  @IsStringCustom()
  houseNumber: string;

  @ApiProperty()
  @IsOptional()
  @IsNumberCustom()
  @MinCustom(0)
  latitude: number;

  @ApiProperty()
  @IsOptional()
  @IsNumberCustom()
  @MinCustom(0)
  longitude: number;

  @ApiProperty()
  @IsOptional()
  @IsStringCustom()
  houseType: string;

  @ApiProperty()
  @IsOptional()
  @IsNumberCustom()
  @MinCustom(0)
  numberOfFloor: number;

  @ApiProperty()
  @IsOptional()
  @IsNumberCustom()
  @MinCustom(0)
  numberOfRoom: number;

  @ApiProperty()
  @IsOptional()
  @IsNumberCustom()
  @MinCustom(0)
  numberOfBathroom: number;

  @ApiProperty()
  @IsOptional()
  @IsNumberCustom()
  width: number;

  @ApiProperty()
  @IsOptional()
  @IsNumberCustom()
  length: number;

  @ApiProperty()
  @IsOptional()
  @IsNumberCustom()
  roadWidth: number;

  @ApiProperty()
  @IsOptional()
  @IsStringCustom()
  title: string;

  @ApiProperty()
  @IsOptional()
  @IsStringCustom()
  description: string;

  @ApiProperty()
  @IsOptional()
  @IsStringCustom()
  legalDocument: string;
}
