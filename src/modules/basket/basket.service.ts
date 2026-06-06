import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { UpdateBasketDto } from './dto/update-basket.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Basket } from './entities/basket.entity';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { BasketItem } from './entities/basket-item.entity';

@Injectable()
export class BasketService {
  constructor(
    @InjectRepository(Basket)
    private readonly basketRepo: Repository<Basket>,
    @InjectRepository(BasketItem)
    private readonly basketItemRepo: Repository<BasketItem>,
  ) { }

  // create new basket
  async create(userId: string): Promise<Basket> {
    const existing = await this.basketRepo.findOne({
      where: { user: { id: userId } },
    });

    if (existing) return existing;

    const basket = this.basketRepo.create({
      user: { id: userId },
    });

    return await this.basketRepo.save(basket);
  };

  // 
  findAll() {
    return `This action returns all basket`;
  }

  // to get one's own basket
  async getOneBasket(user: User): Promise<Basket> {
    try {
      return await this.basketRepo.findOne({ where: { userId: user.id }, relations: { items: true } });
    } catch (error: any) {
      throw error instanceof HttpException
        ? error
        : new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} basket`;
  }

  update(id: number, updateBasketDto: UpdateBasketDto) {
    return `This action updates a #${id} basket`;
  }

  remove(id: number) {
    return `This action removes a #${id} basket`;
  }
}
