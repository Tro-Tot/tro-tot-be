import { PartialType } from '@nestjs/swagger';
import { CreateTuyaDto } from './create-tuya.dto';

export class UpdateTuyaDto extends PartialType(CreateTuyaDto) {}
