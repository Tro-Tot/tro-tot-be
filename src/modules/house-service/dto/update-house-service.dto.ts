import { PartialType } from '@nestjs/swagger';
import { CreateHouseServiceDto } from './create-house-service.dto';

export class UpdateHouseServiceDto extends PartialType(CreateHouseServiceDto) {}
