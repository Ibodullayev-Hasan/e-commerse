import { Injectable } from '@nestjs/common';
import { CreateBascketDto } from './dto/create-bascket.dto';
import { UpdateBascketDto } from './dto/update-bascket.dto';

@Injectable()
export class BascketService {
  create(createBascketDto: CreateBascketDto) {
    return 'This action adds a new bascket';
  }

  findAll() {
    return `This action returns all bascket`;
  }

  findOne(id: number) {
    return `This action returns a #${id} bascket`;
  }

  update(id: number, updateBascketDto: UpdateBascketDto) {
    return `This action updates a #${id} bascket`;
  }

  remove(id: number) {
    return `This action removes a #${id} bascket`;
  }
}
