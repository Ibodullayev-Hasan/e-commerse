import { forwardRef, Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { AdminModule } from '../admin/admin.module';
import { UsersModule } from '../users/users.module';
import { TokenService } from '../../common/services/token.service';
import { CategoryModule } from '../category/category.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Product]),
    forwardRef(() => AdminModule),
    forwardRef(() => CategoryModule)
  ],
  controllers: [ProductController],
  providers: [ProductService, TokenService],
  exports: [ProductService, TypeOrmModule.forFeature([Product])]
})
export class ProductModule { }
