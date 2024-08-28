import { ApiProperty } from '@nestjs/swagger';
import {
  IsNumber,
  IsOptional,
  IsString,
  Min,
  MinLength,
} from 'class-validator';
import { i18nValidationMessage } from 'nestjs-i18n';
import {
  IsNotEmptyCustom,
  IsStringCustom,
} from 'src/common/decorator/class-validator-custom.decorator';
import { I18nTranslations } from 'src/i18n/generated/i18n.generated';
import { IsHouseExist } from '../validator/is-house-exist-validator';

export class CreateHouseDTO {
  @ApiProperty()
  @IsString()
  @IsOptional()
  @IsHouseExist()
  cooperativeContractId: string;

  @ApiProperty()
  @MinLength(3, {
    message: i18nValidationMessage<I18nTranslations>(
      'validation.INVALID_MIN_LENGTH',
      { length: 3 },
    ),
  })
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
  @IsNumber()
  @Min(0)
  latitude: number;

  @ApiProperty()
  @IsNumber()
  @Min(0)
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
