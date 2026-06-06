import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User } from "../../modules/users/entities/user.entity";
import { JwtService } from '@nestjs/jwt';
import * as CryptoJS from 'crypto-js';
import { IJwtPayload } from '../../interfaces';


@Injectable()
export class TokenService {

	private jwtSecretKey: string;
	private refreshSecretKey: string;
	private aesKey: string;
	private accessTime: number;
	private refreshTime: number;

	constructor(private readonly jwtService: JwtService) {
		this.jwtSecretKey = process.env.SECRET_KEY as string;
		this.refreshSecretKey = process.env.REFRESH_SECRET_KEY as string;
		this.aesKey = process.env.AES_KEY as string || '';
		this.accessTime = parseInt(process.env.JWT_ACCESS_EXPIRES_TIME || '900');
		this.refreshTime = parseInt(process.env.JWT_REFRESH_EXPIRES_TIME || '604800');
	}

	async generator(user: IJwtPayload): Promise<{
		accToken: string,
		refToken: string,
		accessExpiresIn: number,
		refreshExpiresIn: number
	}> {
		try {
			if (!this.jwtSecretKey || !this.aesKey) {
				throw new HttpException('Missing secret keys', HttpStatus.INTERNAL_SERVER_ERROR);
			}

			const payload = { sub: user.sub, email: user.email, role: user.role };

			const [accToken, refToken] = await Promise.all([
				this.jwtService.signAsync(payload, { secret: this.jwtSecretKey, expiresIn: this.accessTime, algorithm: "HS512" }),
				this.jwtService.signAsync(payload, { secret: this.refreshSecretKey, expiresIn: this.refreshTime, algorithm: "HS512" }),
			]);

			// JWT'ni AES-256 bilan shifrlash
			const encryptedAccToken = CryptoJS.AES.encrypt(accToken, this.aesKey).toString();
			const encryptedRefToken = CryptoJS.AES.encrypt(refToken, this.aesKey).toString();

			return {
				accToken: encryptedAccToken,
				accessExpiresIn: this.accessTime,
				refToken: encryptedRefToken,
				refreshExpiresIn: this.refreshTime
			};
		} catch (error: any) {
			throw error instanceof HttpException
				? error
				: new HttpException(error.message, HttpStatus.BAD_REQUEST);
		}
	}
}