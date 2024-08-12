import { Injectable } from '@nestjs/common';
import { CreateTuyaDto } from './dto/create-tuya.dto';
import { UpdateTuyaDto } from './dto/update-tuya.dto';
import { TuyaContext } from '@tuya/tuya-connector-nodejs';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TuyaService {
  constructor(private config: ConfigService) {}
  create(createTuyaDto: CreateTuyaDto) {
    return 'This action adds a new tuya';
  }

  async findAll() {
    const tuya = new TuyaContext({
      baseUrl: this.config.get('TUYA_ENDPOINT'),
      accessKey: this.config.get('TUYA_ACCESS_KEY'),
      secretKey: this.config.get('TUYA_SECRET_KEY'),
    });

    const device = await tuya.device.detail({
      device_id: 'vdevo172318164725677',
    });
    const test = await tuya.deviceStatus.status({
      device_id: 'vdevo172318164725677',
    });
    console.log(test);
    // console.log(device);S
    return 'asd';
  }

  findOne(id: number) {
    return `This action returns a #${id} tuya`;
  }

  update(id: number, updateTuyaDto: UpdateTuyaDto) {
    return `This action updates a #${id} tuya`;
  }

  remove(id: number) {
    return `This action removes a #${id} tuya`;
  }
}
