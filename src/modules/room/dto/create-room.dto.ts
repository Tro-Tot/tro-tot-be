import { ApiProperty } from '@nestjs/swagger';
import { RoomStatus } from '@prisma/client';
import {
  IsString,
  IsUUID,
  IsOptional,
  IsNumber,
  IsBoolean,
  IsEnum,
} from 'class-validator';

export class CreateRoomDto {
  @ApiProperty({ description: 'House ID', type: String })
  @IsUUID()
  houseId: string;

  @ApiProperty({ description: 'Attachment ID', type: String, required: false })
  @IsUUID()
  @IsOptional()
  attachmentId?: string;

  @ApiProperty({ description: 'Room Name', type: String })
  @IsString()
  roomName: string;

  @ApiProperty({ description: 'Width of the room', type: Number })
  @IsNumber()
  width: number;

  @ApiProperty({ description: 'Length of the room', type: Number })
  @IsNumber()
  length: number;

  @ApiProperty({ description: 'Height of the room', type: Number })
  @IsNumber()
  height: number;

  @ApiProperty({ description: 'Square Footage of the room', type: Number })
  @IsNumber()
  squareFootage: number;

  @ApiProperty({ description: 'Reservation Price', type: Number })
  @IsNumber()
  reservationPrice: number;

  @ApiProperty({ description: 'Number of Bedrooms', type: Number })
  @IsNumber()
  numberOfBedrooms: number;

  @ApiProperty({ description: 'Number of Bathrooms', type: Number })
  @IsNumber()
  numberOfBathrooms: number;

  @ApiProperty({ description: 'Rent Price', type: Number })
  @IsNumber()
  rentPrice: number;

  @ApiProperty({ description: 'Number of People', type: Number })
  @IsNumber()
  numberOfPeople: number;

  @ApiProperty({ description: 'Room description', type: String })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ description: 'Has Mezzanine', type: Boolean })
  @IsBoolean()
  hasMezzanine: boolean;

  status?: RoomStatus;
}
