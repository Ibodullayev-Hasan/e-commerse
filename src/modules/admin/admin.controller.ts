import { Body, Controller, Get, Param, Patch, Query, UseGuards } from '@nestjs/common';
import { AdminService } from './admin.service';
import { Roles } from '../../common/decorators';
import { UserRole } from '../../common/enum';
import { AdminUpdateUserDto } from './dto/admin-update.dto';
import { UsersService } from '../users/users.service';
import { res } from '../../common/helper';
import { PaginationDto } from '../users/dto/pagination.dto';
import { JwtGuard, RoleGuard } from '../auth/guards';


@UseGuards(JwtGuard, RoleGuard)
@Controller('admin')
export class AdminController {
  constructor(private readonly usersService: UsersService) { }

  @Roles(UserRole.ADMIN)
  @Get('users')
  async findAll(@Query() paginationDto: PaginationDto) {
    const data = await this.usersService.findAll(paginationDto);

    return res(`Users data`, data)
  };

  @Patch('manage/:id')
  @Roles(UserRole.ADMIN)
  async manageUser(
    @Param('id') id: string,
    @Body() dto: AdminUpdateUserDto,
  ) {
    const data = await this.usersService.manageUser(id, dto);

    return res(`User updated`, data);
  };
}
