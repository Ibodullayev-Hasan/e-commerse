import { BadRequestException, HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { User } from '../users/entities/user.entity';
import { LoginDto } from './dto/login.dto';
import { TokenService } from '../../common/services/token.service';
import * as bcrypt from 'bcryptjs';
@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly tokenService: TokenService
  ) { }

  // new user registration
  async register(createUserDto: CreateUserDto): Promise<User> {

    try {
      const user = await this.userService.create(createUserDto);

      delete user.hashedPassword;

      return user
    } catch (error: any) {
      throw error instanceof HttpException
        ? error
        : new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  };

  // user login
  async login(loginDto: LoginDto): Promise<string> {

    try {
      const { email, password } = loginDto
      const user = await this.userService.findByEmail(email);
      
      const comparedPasword = await bcrypt.compare(password, user.hashedPassword);
      
      if (!comparedPasword) {
        throw new UnauthorizedException(`Incorrect password!`)
      };

      const token = await this.tokenService.generator(user);

      return token.accToken;
    } catch (error: any) {
      throw error instanceof HttpException
        ? error
        : new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  };
}
