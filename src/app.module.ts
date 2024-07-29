import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { RoleModule } from './modules/role/role.module';
import { MailModule } from './modules/mail/mail.module';

@Module({
  imports: [ConfigModule.forRoot(), RoleModule, MailModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
