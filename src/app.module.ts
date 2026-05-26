import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';

import dbConfig from './database/config/db.config';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TransformInterceptor } from './common/interceptors';
import { AdminModule } from './modules/admin/admin.module';
import { ProductModule } from './modules/product/product.module';
import { BascketModule } from './modules/bascket/bascket.module';
import { OrderModule } from './modules/order/order.module';
import { CategoryModule } from './modules/category/category.module';

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

    AuthModule, UsersModule, AdminModule, ProductModule, BascketModule, OrderModule, CategoryModule
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor
    }
  ]
})
export class AppModule { };
