import { forwardRef, Global, Module } from '@nestjs/common';
import { MailService } from './mail.service';
import { MailerModule } from '@nestjs-modules/mailer';
import { ConfigService } from '@nestjs/config';
import { MailController } from './mail.controller';
import { TokenService } from '../../../common/services/token.service';
import { UsersModule } from '../../users/users.module';
import { BasketModule } from '../../basket/basket.module';

@Global()
@Module({
  imports: [

    MailerModule.forRootAsync({
      useFactory: async (configService: ConfigService) => ({
        transport: {
          service: "gmail",
          host: configService.getOrThrow(`MAIL_HOST`),
          port: 465,
          secure: true,
          pool: true,          // connection pool yoqish
          maxConnections: 5,
          auth: {
            user: configService.getOrThrow(`MAIL_USER`),
            pass: configService.getOrThrow(`MAIL_PASS`)
          }
        }
      }),
      inject: [ConfigService]
    }),

    forwardRef(() => UsersModule),
    forwardRef(() => BasketModule)
  ],
  controllers: [MailController],
  providers: [MailService, TokenService],
})
export class MailModule { }
