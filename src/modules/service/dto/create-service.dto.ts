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

export class CreateServiceDTO {
  @ApiProperty()
  @IsOptional()
  @IsUUIDCustom()
  serviceScheduleId: string;

  @ApiProperty()
  @IsStringCustom()
  serviceName: string;

  @ApiProperty()
  @IsNumberCustom()
  @MinCustom(0)
  servicePrice: number;

  @ApiProperty()
  @IsEnumCustom(ServiceType)
  serviceType: ServiceType;

  @ApiProperty()
  @IsStringCustom()
  unit: string;

  @ApiProperty()
  @IsNumberCustom()
  @MinCustom(0)
  billCycle: number;

  @ApiProperty()
  @IsBooleanCustom()
  isCompulsory: boolean;

  @ApiProperty()
  @IsBooleanCustom()
  isManual: boolean;

  @ApiProperty()
  @IsEnumCustom(ServiceStatus)
  status: ServiceStatus;
}
