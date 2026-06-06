import { Controller, Get, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { BasketService } from './basket.service';
import { UpdateBasketDto } from './dto/update-basket.dto';
import { JwtGuard, RoleGuard } from '../auth/guards';
import { CurrentUser, Roles } from '../../common/decorators';
import { UserRole } from '../../common/enum';
import { User } from '../users/entities/user.entity';
import { res } from '../../common/helper';

@UseGuards(JwtGuard, RoleGuard)
@Controller('basket')
export class BasketController {
  constructor(private readonly basketService: BasketService) { };

  @Get()
  @Roles(UserRole.ADMIN)
  findAll() {
    return this.basketService.findAll();
  };

  @Get('my')
  async toGetOnesOwnBasket(@CurrentUser() user: User) {
    const data = await this.basketService.getOneBasket(user);
    return res(`Your cart has been successfully get.`, { basket: data })
  };

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.basketService.findOne(+id);
  }

  @Patch(':id')
  @Roles(UserRole.ADMIN)
  update(@Param('id') id: string, @Body() updateBasketDto: UpdateBasketDto) {
    return this.basketService.update(+id, updateBasketDto);
  }

  @Delete(':id')
  @Roles(UserRole.ADMIN)
  remove(@Param('id') id: string) {
    return this.basketService.remove(+id);
  }
}
