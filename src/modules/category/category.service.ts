import { ConflictException, HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepo: Repository<Category>
  ) { }

  // new Category
  async create(dto: CreateCategoryDto): Promise<Category> {
    try {
      const category = await this.categoryRepo.findOne({ where: { categoryName: dto.categoryName } });

      if (category) throw new ConflictException(`Bu Category allaqachon bor`);

      const newCategory = this.categoryRepo.create(dto);

      return await this.categoryRepo.save(newCategory);
    } catch (error: any) {
      throw error instanceof HttpException
        ? error
        : new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  };

  async findAll(): Promise<Category[]> {
    try {
      const category = await this.categoryRepo
        .createQueryBuilder('category')
        .leftJoin('category.products', 'product')
        .addSelect(['product.id', 'product.productName'])
        .getMany();

      return category
    } catch (error: any) {
      throw error instanceof HttpException
        ? error
        : new HttpException(error.message, HttpStatus.BAD_REQUEST);
    };
  }

  // find by name Category
  async findCategoryByName(categoryName: string): Promise<Category> {
    try {
      const category = await this.categoryRepo.findOne({ where: { categoryName }, relations: { products: true } });

      if (!category) throw new NotFoundException(`Category mavjud emas`);

      return category
    } catch (error: any) {
      throw error instanceof HttpException
        ? error
        : new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  async findById(id: string) {
    try {
      const category = await this.categoryRepo
        .createQueryBuilder('category')
        .leftJoin('category.products', 'product')
        .addSelect(['product.id', 'product.productName'])
        .where('category.id = :id', { id })
        .getOne();

      if (!category) throw new NotFoundException(`Category mavjud emas`);

      return category
    } catch (error: any) {
      throw error instanceof HttpException
        ? error
        : new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  update(id: number, updateCategoryDto: UpdateCategoryDto) {
    return `This action updates a #${id} category`;
  }

  remove(id: number) {
    return `This action removes a #${id} category`;
  }
}
