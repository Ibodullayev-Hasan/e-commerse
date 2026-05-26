import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { BascketService } from './bascket.service';
import { CreateBascketDto } from './dto/create-bascket.dto';
import { UpdateBascketDto } from './dto/update-bascket.dto';

@Controller('bascket')
export class BascketController {
  constructor(private readonly bascketService: BascketService) {}

  @Post()
  create(@Body() createBascketDto: CreateBascketDto) {
    return this.bascketService.create(createBascketDto);
  }

  @Get()
  findAll() {
    return this.bascketService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bascketService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateBascketDto: UpdateBascketDto) {
    return this.bascketService.update(+id, updateBascketDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.bascketService.remove(+id);
  }
}
