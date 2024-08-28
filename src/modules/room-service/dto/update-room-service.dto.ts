import { PartialType } from '@nestjs/swagger';
import { CreateRoomServiceDto } from './create-room-service.dto';

export class UpdateRoomServiceDto extends PartialType(CreateRoomServiceDto) {}
