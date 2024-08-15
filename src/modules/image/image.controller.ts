import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  UseGuards,
  UploadedFiles,
} from '@nestjs/common';

import { ImageResponse, ImageService } from './image.service';
import { CreateImageDto } from './dto/create-image.dto';
import { UpdateImageDto } from './dto/update-image.dto';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { ApiResponse } from 'src/common/dto/response.dto';

@Controller('image')
export class ImageController {
  constructor(private readonly imageService: ImageService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  create(@UploadedFile() file: Express.Multer.File) {
    // console.log(file);
    return this.imageService.createImage(file);
  }

  @Get()
  findAll() {
    return this.imageService.getImages();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.imageService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateImageDto: UpdateImageDto) {
    return this.imageService.update(+id, updateImageDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.imageService.remove(+id);
  }

  @Post('/array')
  // @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(FilesInterceptor('files', 10))
  async uploadAvatarArray(@UploadedFiles() files: Express.Multer.File[]) {
    const result: ImageResponse =
      await this.imageService.handleArrayImagesWithoutApiResponse(
        files,
        'test',
        'test',
      );
    console.log(result);
    return 'test';
  }
}
