import { ApiProperty } from '@nestjs/swagger';
import { FileType } from '@prisma/client';
import { IsString, IsUUID, IsEnum, IsUrl, IsOptional } from 'class-validator';

export class CreateAttachmentDto {
  @ApiProperty({ description: 'The name of the file' })
  @IsString()
  fileName: string;

  @ApiProperty({ description: 'The type of the file', enum: FileType })
  @IsEnum(FileType)
  fileType: FileType;

  @ApiProperty({ description: 'The URL of the file' })
  @IsUrl()
  fileUrl: string;

  @IsUUID()
  @IsOptional()
  houseId?: string;

  @IsUUID()
  @IsOptional()
  roomId?: string;
}
