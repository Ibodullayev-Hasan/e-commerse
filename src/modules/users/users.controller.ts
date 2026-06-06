import { Controller, Get, Body, Patch, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { res } from '../../common/helper';
import { JwtGuard, RoleGuard } from '../auth/guards';
import { CurrentUser } from '../../common/decorators';
import { User } from './entities/user.entity';

@UseGuards(JwtGuard, RoleGuard)
@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @Get('me')
  async myProfile(@CurrentUser() user: User) {

    const data = await this.usersService.myProfile(user);

    return res(`User profile`, data);
  };

  @Patch('profile')
  async updateProfile(
    @CurrentUser() user: { sub: string },
    @Body() dto: UpdateUserDto,
  ) {
    const data = await this.usersService.updateProfile(user, dto);

    return res(`User successfully updated!`, data);
  };
}
