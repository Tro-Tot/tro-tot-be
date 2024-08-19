import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateRoomDto } from './create-room.dto';
import {
  IsUUID,
  IsOptional,
  IsString,
  IsNumber,
  IsBoolean,
  IsEnum,
} from 'class-validator';
import { RoomStatus } from '@prisma/client';

export class UpdateRoomDto {
  @ApiProperty({ description: 'Room Name', type: String })
  @IsString()
  @IsOptional()
  roomName?: string;

  @ApiProperty({ description: 'Width of the room', type: Number })
  @IsNumber()
  @IsOptional()
  width?: number;

  @ApiProperty({ description: 'Length of the room', type: Number })
  @IsNumber()
  @IsOptional()
  length?: number;

  @ApiProperty({ description: 'Height of the room', type: Number })
  @IsNumber()
  @IsOptional()
  height?: number;

  @ApiProperty({ description: 'Square Footage of the room', type: Number })
  @IsNumber()
  @IsOptional()
  squareFootage?: number;

  @ApiProperty({ description: 'Reservation Price', type: Number })
  @IsNumber()
  @IsOptional()
  reservationPrice?: number;

  @ApiProperty({ description: 'Number of Bedrooms', type: Number })
  @IsNumber()
  @IsOptional()
  numberOfBedrooms?: number;

  @ApiProperty({ description: 'Number of Bathrooms', type: Number })
  @IsNumber()
  @IsOptional()
  numberOfBathrooms?: number;

  @ApiProperty({ description: 'Rent Price', type: Number })
  @IsNumber()
  @IsOptional()
  rentPrice?: number;

  @ApiProperty({ description: 'Number of People', type: Number })
  @IsNumber()
  @IsOptional()
  numberOfPeople?: number;

  @ApiProperty({ description: 'Room description', type: String })
  @IsOptional()
  @IsString()
  description?: string;

  @ApiProperty({ description: 'Has Mezzanine', type: Boolean })
  @IsBoolean()
  @IsOptional()
  hasMezzanine?: boolean;

  @ApiProperty({ description: 'Status', type: String, default: 'available' })
  @IsEnum(RoomStatus)
  @IsOptional()
  status?: RoomStatus;
}
