import { PartialType } from '@nestjs/swagger';
import { CreateHouseDTO } from './create-house.dto';

export class UpdateHouseDTO extends PartialType(CreateHouseDTO) {}
