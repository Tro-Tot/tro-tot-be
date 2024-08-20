import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateAttachmentDto } from './create-attachment.dto';
import { IsOptional, IsString } from 'class-validator';

export class UpdateAttachmentDto {
  @ApiProperty({ description: 'Display name' })
  @IsOptional()
  @IsString()
  displayName: string;
}
