import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { TuyaService } from './tuya.service';
import { CreateTuyaDto } from './dto/create-tuya.dto';
import { UpdateTuyaDto } from './dto/update-tuya.dto';

@Controller('tuya')
export class TuyaController {
  constructor(private readonly tuyaService: TuyaService) {}

  @Post()
  create(@Body() createTuyaDto: CreateTuyaDto) {
    return this.tuyaService.create(createTuyaDto);
  }

  @Get()
  findAll() {
    return this.tuyaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.tuyaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTuyaDto: UpdateTuyaDto) {
    return this.tuyaService.update(+id, updateTuyaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tuyaService.remove(+id);
  }
}
