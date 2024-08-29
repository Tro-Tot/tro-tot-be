import { ApiProperty } from '@nestjs/swagger';
import { ServiceStatus, ServiceType } from '@prisma/client';
import { IsOptional } from 'class-validator';
import {
  IsBooleanCustom,
  IsEnumCustom,
  IsNumberCustom,
  IsStringCustom,
  IsUUIDCustom,
  MinCustom,
} from 'src/common/decorator/class-validator-custom.decorator';

export class UpdateServiceDTO {
  @ApiProperty()
  @IsOptional()
  @IsUUIDCustom()
  serviceScheduleId: string;

  @ApiProperty()
  @IsOptional()
  @IsStringCustom()
  serviceName: string;

  @ApiProperty()
  @IsOptional()
  @IsNumberCustom()
  @MinCustom(0)
  servicePrice: number;

  @ApiProperty()
  @IsOptional()
  @IsEnumCustom(ServiceType)
  serviceType: ServiceType;

  @ApiProperty()
  @IsOptional()
  @IsStringCustom()
  unit: string;

  @ApiProperty()
  @IsOptional()
  @IsNumberCustom()
  @MinCustom(0)
  billCycle: number;

  @ApiProperty()
  @IsOptional()
  @IsBooleanCustom()
  isCompulsory: boolean;

  @ApiProperty()
  @IsOptional()
  @IsBooleanCustom()
  isManual: boolean;

  @ApiProperty()
  @IsOptional()
  @IsEnumCustom(ServiceStatus)
  status: ServiceStatus;
}
