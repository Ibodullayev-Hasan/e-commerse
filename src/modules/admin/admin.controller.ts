import { Body, Controller, Get, Param, ParseUUIDPipe, Patch, Query, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import { Roles } from '../../common/decorators';
import { UserRole } from '../../common/enum';
import { AdminUpdateUserDto } from './dto/admin-update.dto';
import { UsersService } from '../users/users.service';
import { res } from '../../common/helper';
import { PaginationDto } from '../users/dto/pagination.dto';
import { JwtGuard, RoleGuard } from '../auth/guards';
import { SearchDto } from './dto/search.dto';


@UseGuards(JwtGuard, RoleGuard)
@Roles(UserRole.ADMIN)
@Controller('admin')
export class AdminController {
  constructor(private readonly usersService: UsersService) { }

  // user data via pagination
  @Get('users')
  async findAll(@Query() paginationDto: PaginationDto) {
    const data = await this.usersService.findAll(paginationDto);

    return res(`Users data`, data)
  };

  // find user by name
  @Get('user/search')
  async findUserByName(@Query() dto: SearchDto) {
    const data = await this.usersService.findByName(dto);

    return res(`User successfully found`, {
      meta: {
        count: data[1]
      },
      users: data[0]
    })
  };

  // find user by id
  @Get('user/:id')
  async findUserById(@Param('id', ParseUUIDPipe) id: string) {
    const data = await this.usersService.findById(id);

    return res(`User successfully found`, { user: data })
  };


  // change user information
  @Patch('manage/:id')
  async manageUser(
    @Param('id') id: string,
    @Body() dto: AdminUpdateUserDto,
  ) {
    const data = await this.usersService.manageUser(id, dto);

    return res(`User updated`, data);
  };
}
