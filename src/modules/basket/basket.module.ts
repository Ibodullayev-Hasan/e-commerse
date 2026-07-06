import { forwardRef, Module } from '@nestjs/common';
import { BasketService } from './basket.service';
import { BasketController } from './basket.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Basket } from './entities/basket.entity';
import { UsersModule } from '../users/users.module';
import { TokenService } from '../../common/services/token.service';
import { BasketItem } from './entities/basket-item.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Basket, BasketItem]),
    forwardRef(() => UsersModule)
  ],
  controllers: [BasketController],
  providers: [BasketService, TokenService],
  exports: [BasketService, TypeOrmModule.forFeature([Basket, BasketItem]),]
})
export class BasketModule { }
