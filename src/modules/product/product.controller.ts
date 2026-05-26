import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Query } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { JwtGuard, RoleGuard } from '../auth/guards';
import { Roles } from '../../common/decorators';
import { UserRole } from '../../common/enum';
import { res } from '../../common/helper';
import { ProductPaginationDto } from './dto/product.pagination.dto';


@UseGuards(JwtGuard, RoleGuard)
@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) { }

  @Post()
  @Roles(UserRole.ADMIN)
  async create(@Body() createProductDto: CreateProductDto) {
    const data = await this.productService.create(createProductDto);

    return res(`Product yaratildi`, data);
  };

  @Get()
  async findAll(@Query() dto: ProductPaginationDto) {
    const data = await this.productService.findAll(dto);
    return res(`Products`, data);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(+id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.remove(+id);
  }
}
