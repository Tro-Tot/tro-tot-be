import { Module } from '@nestjs/common';
import { TuyaService } from './tuya.service';
import { TuyaController } from './tuya.controller';
import { ConfigModule } from '@nestjs/config';

@Module({
  controllers: [TuyaController],
  imports: [ConfigModule.forRoot()],
  providers: [TuyaService],
})
export class TuyaModule {}
