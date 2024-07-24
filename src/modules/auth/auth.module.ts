import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserService } from '../user/user.service';
import { UserModule } from '../user/user.module';
import { LocalStrategy } from './strategy/local.strategy';
import { PassportModule } from '@nestjs/passport';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { RefreshTokenStrategy } from './strategy/refresh-token.stategy';
import { RefreshTokenModule } from '../refresh-token/refresh-token.module';
import { AccessTokenStrategy } from './strategy/access-token.strategy';

@Module({
  controllers: [AuthController],
  imports: [
    JwtModule.register({}),
    UserModule,
    ConfigModule,
    RefreshTokenModule,
  ],
  providers: [
    AuthService,
    LocalStrategy,
    RefreshTokenStrategy,
    AccessTokenStrategy,
  ],
})
export class AuthModule {}
