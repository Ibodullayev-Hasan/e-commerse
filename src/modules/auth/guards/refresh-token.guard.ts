import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import * as CryptoJS from 'crypto-js';


@Injectable()
export class RefreshGuard implements CanActivate {
	constructor(private jwtService: JwtService) { }

	async canActivate(context: ExecutionContext): Promise<boolean> {
		try {
			const req = context.switchToHttp().getRequest();

			const authHeader = req.headers['authorization'];
			if (!authHeader?.startsWith('Bearer ')) {
				throw new UnauthorizedException('Refresh token topilmadi');
			}

			const encryptedToken = authHeader.split(' ')[1];

			// AES decrypt
			const decryptedToken = CryptoJS.AES
				.decrypt(encryptedToken, process.env.AES_KEY)
				.toString(CryptoJS.enc.Utf8);

			if (!decryptedToken) {
				throw new UnauthorizedException('Token noto\'g\'ri');
			}

			// REFRESH_SECRET_KEY bilan verify
			const payload = await this.jwtService.verifyAsync(decryptedToken, {
				secret: process.env.REFRESH_SECRET_KEY,
			});

			req.user = payload;
			return true;
		} catch (error: any) {
			throw error instanceof HttpException
				? error
				: new HttpException(error.message, HttpStatus.BAD_REQUEST);
		}
	}
}