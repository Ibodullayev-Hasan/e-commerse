import { CanActivate, ExecutionContext, ForbiddenException, HttpException, Injectable, UnauthorizedException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UserRole } from '../../../common/enum';

@Injectable()
export class RoleGuard implements CanActivate {

  constructor(private readonly reflector: Reflector) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {

      const requiredRoles = this.reflector.getAllAndOverride<UserRole[]>('roles', [
        context.getHandler(),
        context.getClass(),
      ]);

      if (!requiredRoles || requiredRoles.length === 0) {
        return true;
      }

      const req = context.switchToHttp().getRequest();
      const user = req.user; // JwtGuard dan keladi

      if (!user) {
        throw new UnauthorizedException('Foydalanuvchi aniqlanmadi');
      }

      // User roli talab qilingan rollar ichida bormi
      const hasRole = requiredRoles.includes(user.role);

      if (!hasRole) {
        throw new ForbiddenException('Bu amalni bajarish uchun ruxsat yo\'q');
      };

      return true;
    } catch (error: any) {
      throw error instanceof HttpException
        ? error
        : new UnauthorizedException(error.message);
    }
  }
}
