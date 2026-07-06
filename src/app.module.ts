import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TransformInterceptor } from './common/interceptors';
import { AdminModule } from './modules/admin/admin.module';
import { ProductModule } from './modules/product/product.module';
import { OrderModule } from './modules/order/order.module';
import { CategoryModule } from './modules/category/category.module';
import { BasketModule } from './modules/basket/basket.module';

import { APP_INTERCEPTOR } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';

import dbConfig from './database/config/db.config';
import { MailModule } from './modules/auth/mail/mail.module';
import { RedisModule } from './modules/auth/mail/redis.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [".env.dev"],
      load: [dbConfig],
    }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        ...configService.getOrThrow('database')
      }),
      inject: [ConfigService]
    }),

    JwtModule.registerAsync({
      global: true,
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.getOrThrow(`SECRET_KEY`)
      })
    }),

    AuthModule,
    UsersModule,
    AdminModule,
    ProductModule,
    OrderModule,
    CategoryModule,
    BasketModule,
    MailModule,
    RedisModule
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor
    }
  ]

})
export class AppModule { };
