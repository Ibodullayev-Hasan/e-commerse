import { Controller, Get, Post, Body, Patch, Param, Delete, HttpCode } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { res } from '../../common/helper';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post("register")
  @HttpCode(201)
  async register(@Body() createUserDto: CreateUserDto) {
    const data = await this.authService.register(createUserDto);

    return res(`User registred`, data)
  }

  @Post("login")
  @HttpCode(200)
  async login(@Body() loginDto: LoginDto) {

    const data = await this.authService.login(loginDto);

    return res(`User logined`, { acessToken: data });
  };
}
