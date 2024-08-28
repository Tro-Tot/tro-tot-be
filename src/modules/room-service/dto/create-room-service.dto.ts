import { IsNotEmpty, IsUUID } from 'class-validator';
import { IsHouseExist } from 'src/modules/house/validator/is-house-exist-validator';
import { IsRoomExist } from 'src/modules/room/validator/is-room-exist.validator';

export class CreateRoomServiceDto {
  @IsNotEmpty()
  @IsUUID()
  @IsHouseExist()
  houseId: string;

  @IsNotEmpty()
  @IsUUID()
  @IsRoomExist()
  roomId: string;
}
