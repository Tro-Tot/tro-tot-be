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
import * as rolesGuard from './common/guard/roles.guard';
import { PrismaService } from 'prisma/prisma.service';
import { RoomModule } from './modules/room/room.module';
import { AttachmentModule } from './modules/attachment/attachment.module';
import { ServiceModule } from './modules/service/service.module';
import * as path from 'path';
import {
  AcceptLanguageResolver,
  HeaderResolver,
  I18nModule,
} from 'nestjs-i18n';

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
  providers: [AppService, PrismaService, rolesGuard.RolesGuard],
  exports: [PrismaService],
})
export class AppModule {}
