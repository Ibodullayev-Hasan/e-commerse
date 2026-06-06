import { Controller, Post, Body, HttpCode, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { res } from '../../common/helper';
import { LoginDto } from './dto/login.dto';
import { RefreshGuard } from './guards';
import { Request } from 'express';
import { MailService } from './mail/mail.service';
import { CurrentUser } from '../../common/decorators';
import { IJwtPayload } from '../../interfaces';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,

  ) { }

  @Post("register")
  @HttpCode(201)
  async register(@Body() createUserDto: CreateUserDto) {
    const data = await this.authService.register(createUserDto);

    return res(`User registred`, data)
  };

  @Post("login")
  @HttpCode(200)
  async login(@Body() loginDto: LoginDto) {

    const tokens = await this.authService.login(loginDto);

    return res(`Successfully logged in`, {
      accToken: tokens.accToken,
      refToken: tokens.refToken,
    });
  };

  @UseGuards(RefreshGuard)
  @Post('refresh')
  @HttpCode(200)
  async refreshToken(@CurrentUser() user: IJwtPayload) {

    const data = await this.authService.refresh(user);

    return res(`Successfully refresh tokens`, { tokens: data })
  };
}
