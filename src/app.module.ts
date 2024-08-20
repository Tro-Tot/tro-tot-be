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
import { APP_GUARD } from '@nestjs/core';
import { RolesGuard } from './common/guard/roles.guard';
import { AuthGuard } from '@nestjs/passport';
import { PrismaService } from 'prisma/prisma.service';
import { RoomModule } from './modules/room/room.module';
import { AttachmentModule } from './modules/attachment/attachment.module';
import { ServiceModule } from './modules/service/service.module';

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
    RoomModule,
    AttachmentModule,
    ServiceModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService, RolesGuard],
  exports: [PrismaService],
})
export class AppModule {}
