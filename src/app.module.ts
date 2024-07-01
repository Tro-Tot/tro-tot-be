import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { RoleModule } from './role/role.module';

@Module({
  imports: [ConfigModule.forRoot(), RoleModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
