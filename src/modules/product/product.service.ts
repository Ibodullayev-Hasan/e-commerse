import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { CategoryService } from '../category/category.service';
import { Category } from '../category/entities/category.entity';
import { ProductPaginationDto } from './dto/product.pagination.dto';

@Injectable()
export class ProductService {

  constructor(
    @InjectRepository(Product)
    private readonly productRepo: Repository<Product>,

    @InjectRepository(Category)
    private readonly categoryRepo: Repository<Category>,

    private readonly categoryService: CategoryService

  ) { }

  async create(dto: CreateProductDto): Promise<Product> {
    try {
      const category = await this.categoryService.findById(dto.categoryId);

      if (!category) throw new NotFoundException(`Category mavjud emas`);

      const newProduct = this.productRepo.create({
        ...dto,
        category
      });

      const savedProduct = await this.productRepo.save(newProduct);

      category.products.push(savedProduct);
      await this.categoryRepo.save(category);

      return savedProduct;
    } catch (error: any) {
      throw error instanceof HttpException
        ? error
        : new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  };

  async findAll({ page = 1, limit = 20, order }: ProductPaginationDto): Promise<{ meta: object, products: Product[] }> {
    try {
      const skip = (page - 1) * limit;

      const [products, total] = await this.productRepo.findAndCount({
        skip,
        take: limit,
        order: { createdAt: order },
      });

      return {
        meta: {
          total,
          page,
          limit,
          totalPages: Math.ceil(total / limit),
        },
        products
      };
    } catch (error: any) {
      throw error instanceof HttpException
        ? error
        : new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async findOne(id: string) {
    try {

      return await this.productRepo.findOne({ where: { id } })
    } catch (error: any) {
      throw error instanceof HttpException
        ? error
        : new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    try {

      return
    } catch (error: any) {
      throw error instanceof HttpException
        ? error
        : new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  remove(id: number) {
    try {

      return
    } catch (error: any) {
      throw error instanceof HttpException
        ? error
        : new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
