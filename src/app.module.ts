import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { RoleModule } from './modules/role/role.module';
import { MailModule } from './modules/mail/mail.module';
import { AuthModule } from './modules/auth/auth.module';
import { UserModule } from './modules/user/user.module';
import { BlacklistTokenModule } from './modules/blacklist-token/blacklist-token.module';
import { RefreshTokenModule } from './modules/refresh-token/refresh-token.module';
import { CidModule } from './modules/cid/cid.module';
import { OtpModule } from './modules/otp/otp.module';
import { ImageModule } from './modules/image/image.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    RoleModule,
    AuthModule,
    UserModule,
    BlacklistTokenModule,
    RefreshTokenModule,
    MailModule,
    CidModule,
    ImageModule,
    OtpModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
