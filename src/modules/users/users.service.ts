import { BadRequestException, ConflictException, ForbiddenException, HttpException, HttpStatus, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { PaginationDto } from './dto/pagination.dto';
import * as bcrypt from 'bcryptjs';
import { AdminUpdateUserDto } from '../admin/dto/admin-update.dto';
import { SearchDto } from '../admin/dto/search.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>
  ) { }

  // create new user
  async create(createUserDto: CreateUserDto): Promise<User> {
    const existingUser = await this.userRepo.findOne({ where: { email: createUserDto.email } });

    if (existingUser) {
      throw new ConflictException(`Bu email avval ro'yxatdan o'tgan`);
    };

    const passwordHashing = await bcrypt.hash(createUserDto.password, 10);

    const newUser = this.userRepo.create({ ...createUserDto, hashedPassword: passwordHashing });


    return await this.userRepo.save(newUser);
  }

  // all users
  async findAll({ page = 1, limit = 20, order }: PaginationDto) {
    const skip = (page - 1) * limit;

    const [users, total] = await this.userRepo.findAndCount({
      skip,
      take: limit,
      order: { createdAt: order },
    });

    return {
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
      users
    };
  };

  // by email
  async findByEmail(email: string): Promise<User> {
    const user = await this.userRepo.findOne({
      where: { email },
      select: {
        id: true,
        email: true,
        role: true,
        hashedPassword: true,
      }
    });

    if (!user) {
      throw new UnauthorizedException(`Ro'yxatdan o'tmagan email`);
    };

    return user
  };

  //  find user by id 
  async findById(id: string) {
    try {
      const user = await this.userRepo.findOne({ where: { id } });

      if (!user) throw new NotFoundException(`User topilmadi`);

      return user
    } catch (error: any) {
      throw error instanceof HttpException
        ? error
        : new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  };

  // find user by name
  async findByName(dto: SearchDto) {
    try {
      const user = this.userRepo
        .createQueryBuilder('users')
        .where('users.fullName ILIKE :fullName', { fullName: `%${dto.fullName}%` })
        .take(dto.limit)
        .skip(dto.offset)
        .getManyAndCount();

      if (!user) throw new NotFoundException(`Bu ism bo'yicha user topilmadi`);

      return user
    } catch (error: any) {
      throw error instanceof HttpException
        ? error
        : new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  };

  // get your own profile
  async myProfile(user: User): Promise<User> {
    const findUser = await this.userRepo.findOne({
      where: { email: user.email },
    });

    return findUser
  };

  // update user profile
  async updateProfile(user: { sub: string }, updateUserDto: UpdateUserDto): Promise<User> {
    try {
      const existingUser = await this.userRepo.findOne({
        where: { id: user.sub },
      });
      const mergedUser = this.userRepo.merge(existingUser, updateUserDto);

      const savedUser = await this.userRepo.save(mergedUser);

      delete savedUser.hashedPassword

      return savedUser;
    } catch (error: any) {
      throw error instanceof HttpException
        ? error
        : new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  };

  // manage user for admin
  async manageUser(id: string, dto: AdminUpdateUserDto): Promise<User> {
    try {
      const existingUser = await this.userRepo.findOne({
        where: { id },
      });
      const mergedUser = this.userRepo.merge(existingUser, dto);

      const savedUser = await this.userRepo.save(mergedUser);

      delete savedUser.hashedPassword
      return savedUser;
    } catch (error: any) {
      throw error instanceof HttpException
        ? error
        : new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  };

}
