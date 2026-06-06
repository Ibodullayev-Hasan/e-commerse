import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, ParseUUIDPipe } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { JwtGuard, RoleGuard } from '../auth/guards';
import { Roles } from '../../common/decorators';
import { UserRole } from '../../common/enum';
import { res } from '../../common/helper';

@UseGuards(JwtGuard, RoleGuard)
@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) { }

  @Roles(UserRole.ADMIN)
  @Post()
  async create(@Body() dto: CreateCategoryDto) {
    const data = await this.categoryService.create(dto);

    return res(`Category yaratildi`, data)
  }

  @Get()
  async findAll() {
    const data = await this.categoryService.findAll();

    return res(`categories data`, { meta: { count: data.length }, categories: data })
  }

  @Get(':id')
  async findOne(@Param('id', ParseUUIDPipe) id: string) {
    const data = await this.categoryService.findById(id);

    return res(`Category by id: ${id}`, data)
  }

  @Patch(':id')
  @Roles(UserRole.ADMIN)
  update(@Param('id') id: string, @Body() updateCategoryDto: UpdateCategoryDto) {
    return this.categoryService.update(+id, updateCategoryDto);
  }

  @Delete(':id')
  @Roles(UserRole.ADMIN)
  remove(@Param('id') id: string) {
    return this.categoryService.remove(+id);
  }
}
