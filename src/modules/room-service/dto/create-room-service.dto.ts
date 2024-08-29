import { IsNotEmpty, IsUUID } from 'class-validator';
import { IsHouseServiceExist } from 'src/modules/house-service/validator/is-house-service-exist.validator';
import { IsRoomExist } from 'src/modules/room/validator/is-room-exist.validator';

export class CreateRoomServiceDto {
  @IsNotEmpty()
  @IsUUID()
  @IsHouseServiceExist()
  houseServiceId: string;

  @IsNotEmpty()
  @IsUUID()
  @IsRoomExist()
  roomId: string;
}
