import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TokenService } from '../../common/services/token.service';

@Module({
  imports: [
    forwardRef(() => UsersModule),

    JwtModule.registerAsync({
      global: true,
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.getOrThrow(`SECRET_KEY`)
      })
    }),

  ],
  controllers: [AuthController],
  providers: [AuthService, TokenService],
  exports: [AuthService]
})
export class AuthModule { }
