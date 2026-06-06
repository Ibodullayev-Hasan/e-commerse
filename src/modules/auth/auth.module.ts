import { forwardRef, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { TokenService } from '../../common/services/token.service';
import { MailModule } from './mail/mail.module';

@Module({
  imports: [
    forwardRef(() => UsersModule),
    MailModule,

  ],
  controllers: [AuthController],
  providers: [AuthService, TokenService],
  exports: [AuthService]
})
export class AuthModule { }
