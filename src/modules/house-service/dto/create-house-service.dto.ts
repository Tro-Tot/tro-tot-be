import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsUUID } from 'class-validator';

export class CreateHouseServiceDto {
  @ApiProperty({ description: 'Service Id', type: String })
  @IsUUID()
  @IsNotEmpty()
  serviceId: string;

  @ApiProperty({ description: 'House Id', type: String })
  @IsUUID()
  @IsNotEmpty()
  houseId: string;
}
