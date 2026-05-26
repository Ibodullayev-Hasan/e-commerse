import { Module } from '@nestjs/common';
import { BascketService } from './bascket.service';
import { BascketController } from './bascket.controller';

@Module({
  controllers: [BascketController],
  providers: [BascketService],
})
export class BascketModule {}
