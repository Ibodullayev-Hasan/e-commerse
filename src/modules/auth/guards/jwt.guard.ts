import { CanActivate, ExecutionContext, HttpException, Injectable, UnauthorizedException } from '@nestjs/common';
import { TokenService } from '../../../common/services/token.service';
import { JwtService } from '@nestjs/jwt';
import * as CryptoJS from 'crypto-js';

@Injectable()
export class JwtGuard implements CanActivate {

  constructor(
    private readonly tokenService: TokenService,
    private jwtService: JwtService
  ) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const req = context.switchToHttp().getRequest();

      // Header dan token olish
      const authHeader = req.headers['authorization'];

      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new UnauthorizedException('Token topilmadi');
      }

      const encryptedToken = authHeader.split(' ')[1];

      // AES decrypt
      const decryptedToken = CryptoJS.AES.decrypt(encryptedToken, process.env.AES_KEY).toString(CryptoJS.enc.Utf8);

      if (!decryptedToken) {
        throw new UnauthorizedException('Token noto\'g\'ri');
      };

      // JWT verify
      const payload = await this.jwtService.verifyAsync(decryptedToken, {
        secret: process.env.SECRET_KEY,
      });

      req.user = payload;

      return true;
    } catch (error: any) {
      throw error instanceof HttpException
        ? error
        : new UnauthorizedException(error.message);
    }
  }
}
