import { ApiProperty } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsNumber,
  IsString,
  Min,
  MinLength,
} from 'class-validator';
import { IsHouseExist } from '../validator/is-house-exist-validator';
import { i18nValidationMessage } from 'nestjs-i18n';
import { I18nTranslations } from 'src/i18n/generated/i18n.generated';

export class CreateHouseDTO {
  @ApiProperty()
  @IsString()
  @IsHouseExist()
  cooperativeContractId: string;

  @ApiProperty()
  @MinLength(3, {
    message: i18nValidationMessage<I18nTranslations>(
      'validation.INVALID_MIN_LENGTH',
      { length: 3 },
    ),
  })
  @IsString({})
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
