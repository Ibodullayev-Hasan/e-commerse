import { forwardRef, Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { UsersModule } from '../users/users.module';
import { AuthModule } from '../auth/auth.module';
import { TokenService } from '../../common/services/token.service';

@Module({
  imports:[
    forwardRef(() => UsersModule),
    forwardRef(() => AuthModule),
  ],
  controllers: [AdminController],
  providers: [AdminService, TokenService],
})
export class AdminModule {}
