import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import {
  IsNotEmptyCustom,
  IsNumberCustom,
  IsStringCustom,
  MinCustom,
  MinLengthCustom,
} from 'src/common/decorator/class-validator-custom.decorator';

export class CreateHouseDTO {
  @ApiProperty()
  @IsStringCustom()
  @IsOptional()
  cooperativeContractId: string;

  @ApiProperty()
  @MinLengthCustom(3)
  @IsNotEmptyCustom()
  @IsStringCustom()
  name: string;

  @ApiProperty()
  @IsNotEmptyCustom()
  @IsStringCustom()
  city: string;

  @ApiProperty()
  @IsNotEmptyCustom()
  @IsStringCustom()
  district: string;

  @ApiProperty()
  @IsNotEmptyCustom()
  @IsStringCustom()
  ward: string;

  @ApiProperty()
  @IsNotEmptyCustom()
  @IsStringCustom()
  street: string;

  @ApiProperty()
  @IsNotEmptyCustom()
  @IsStringCustom()
  houseNumber: string;

  @ApiProperty()
  @IsNumberCustom()
  @MinCustom(0)
  latitude: number;

  @ApiProperty()
  @IsNumberCustom()
  @MinCustom(0)
  longitude: number;

  @ApiProperty()
  @IsStringCustom()
  houseType: string;

  @ApiProperty()
  @IsNumberCustom()
  @MinCustom(0)
  numberOfFloor: number;

  @ApiProperty()
  @IsNumberCustom()
  @MinCustom(0)
  numberOfRoom: number;

  @ApiProperty()
  @IsNumberCustom()
  @MinCustom(0)
  numberOfBathroom: number;

  @ApiProperty()
  @IsNumberCustom()
  width: number;

  @ApiProperty()
  @IsNumberCustom()
  length: number;

  @ApiProperty()
  @IsNumberCustom()
  roadWidth: number;

  @ApiProperty()
  @IsStringCustom()
  title: string;

  @ApiProperty()
  @IsStringCustom()
  description: string;

  @ApiProperty()
  @IsOptional()
  @IsStringCustom()
  legalDocument: string;
}
