import { BadRequestException, ConflictException, ForbiddenException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { PaginationDto } from './dto/pagination.dto';
import * as bcrypt from 'bcryptjs';

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

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

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
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
