import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CidService } from './cid.service';
import { CreateCidDto } from './dto/create-cid.dto';
import { UpdateCidDto } from './dto/update-cid.dto';

@Controller('cid')
export class CidController {
  constructor(private readonly cidService: CidService) {}

  @Get()
  findAll() {
    return this.cidService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.cidService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCidDto: UpdateCidDto) {
    return this.cidService.update(+id, updateCidDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.cidService.remove(+id);
  }
}
