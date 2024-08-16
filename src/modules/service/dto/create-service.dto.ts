import { ApiProperty } from '@nestjs/swagger';
import { ServiceType } from '@prisma/client';
import {
  IsBoolean,
  IsEnum,
  IsInt,
  IsNumber,
  IsString,
  IsUUID,
  Min,
} from 'class-validator';

export class CreateServiceDTO {
  @ApiProperty()
  @IsUUID()
  houseId: string;

  @ApiProperty()
  @IsUUID()
  serviceScheduleId: string;

  @ApiProperty()
  @IsString()
  serviceName: string;

  @ApiProperty()
  @IsNumber()
  @Min(0)
  servicePrice: number;

  @ApiProperty()
  @IsEnum(ServiceType)
  serviceType: ServiceType;

  @ApiProperty()
  @IsString()
  unit: string;

  @ApiProperty()
  @IsInt()
  @Min(0)
  billCycle: number;

  @ApiProperty()
  @IsBoolean()
  isCompulsory: boolean;

  @ApiProperty()
  @IsBoolean()
  isManual: boolean;

  @ApiProperty()
  @IsString()
  status: string;
}
