import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString, Min } from 'class-validator';

export class CreateHouseDTO {
  @ApiProperty()
  @IsString()
  cooperativeContractId: string;

  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsString()
  city: string;

  @ApiProperty()
  @IsString()
  district: string;

  @ApiProperty()
  @IsString()
  ward: string;

  @ApiProperty()
  @IsString()
  street: string;

  @ApiProperty()
  @IsString()
  houseNumber: string;

  @ApiProperty()
  @IsNumber()
  latitude: number;

  @ApiProperty()
  @IsString()
  longitude: number;

  @ApiProperty()
  @IsString()
  houseType: string;

  @ApiProperty()
  @IsNumber()
  @Min(0)
  numberOfFloor: number;

  @ApiProperty()
  @IsNumber()
  @Min(1)
  numberOfRoom: number;

  @ApiProperty()
  @IsNumber()
  @Min(1)
  numberOfBathroom: number;

  @ApiProperty()
  @IsString()
  mainDoorDirection: string;

  @ApiProperty()
  @IsString()
  furniture: string;

  @ApiProperty()
  @IsNumber()
  width: number;

  @ApiProperty()
  @IsNumber()
  length: number;

  @ApiProperty()
  @IsNumber()
  roadWidth: number;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsString()
  legalDocument: string;
}
