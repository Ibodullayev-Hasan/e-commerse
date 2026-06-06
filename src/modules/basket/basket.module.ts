import { forwardRef, Module } from '@nestjs/common';
import { BasketService } from './basket.service';
import { BasketController } from './basket.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Basket } from './entities/basket.entity';
import { UsersModule } from '../users/users.module';
import { TokenService } from '../../common/services/token.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Basket]),
    forwardRef(() => UsersModule)
  ],
  controllers: [BasketController],
  providers: [BasketService, TokenService],
  exports: [BasketService, TypeOrmModule.forFeature([Basket]),]
})
export class BasketModule { }
