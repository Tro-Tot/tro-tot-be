import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import {
  AcceptLanguageResolver,
  HeaderResolver,
  I18nModule,
} from 'nestjs-i18n';
import * as path from 'path';
import { PrismaService } from 'prisma/prisma.service';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import * as rolesGuard from './common/guard/roles.guard';
import { AttachmentModule } from './modules/attachment/attachment.module';
import { AuthModule } from './modules/auth/auth.module';
import { BlacklistTokenModule } from './modules/blacklist-token/blacklist-token.module';
import { CidModule } from './modules/cid/cid.module';
import { HouseServiceModule } from './modules/house-service/house-service.module';
import { ImageModule } from './modules/image/image.module';
import { MailModule } from './modules/mail/mail.module';
import { OtpModule } from './modules/otp/otp.module';
import { RefreshTokenModule } from './modules/refresh-token/refresh-token.module';
import { RoleModule } from './modules/role/role.module';
import { RoomServiceModule } from './modules/room-service/room-service.module';
import { RoomModule } from './modules/room/room.module';
import { ServiceModule } from './modules/service/service.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    I18nModule.forRoot({
      fallbackLanguage: 'vi',
      loaderOptions: {
        path: path.join(__dirname, '/i18n/'),
        watch: true,
      },
      resolvers: [
        { use: HeaderResolver, options: ['x-lang'] },
        AcceptLanguageResolver,
      ],
      typesOutputPath: path.join(
        __dirname,
        '../../src/i18n/generated/i18n.generated.ts',
      ),
    }),
    // RoleModule,
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
    HouseServiceModule,
    RoomServiceModule,
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService, rolesGuard.RolesGuard],
  exports: [PrismaService],
})
export class AppModule {}
