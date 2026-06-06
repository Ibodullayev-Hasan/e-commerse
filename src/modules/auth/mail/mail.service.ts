import { MailerService } from "@nestjs-modules/mailer";
import { BadRequestException, HttpException, HttpStatus, Inject, Injectable } from "@nestjs/common";
import { REDIS_CLIENT } from "./redis.module";
import Redis from "ioredis";
import { UsersService } from "../../users/users.service";
import { BasketService } from "../../basket/basket.service";
import { IJwtPayload } from "../../../interfaces";

@Injectable()
export class MailService {
	constructor(
		@Inject(REDIS_CLIENT) private redis: Redis,
		private mailerService: MailerService,
		private userService: UsersService,
		private basketService: BasketService,
	) { }

	// 1. Kod yuborish
	async sendVerification(email: string): Promise<void> {
		const code = Math.floor(100000 + Math.random() * 900000).toString();

		try {
			await Promise.all([
				this.redis.set(`verify:${email}`, code, 'EX', 300),

				this.mailerService.sendMail({
					from: `"No Reply" <${process.env.MAIL_USER}>`,
					to: email,
					subject: 'Verification code',
					html: `Your code: ${code}`
				})
			]);
		} catch (error: any) {
			throw error instanceof HttpException
				? error
				: new HttpException(error.message, HttpStatus.BAD_REQUEST);
		}
	};

	// 2. Kodni tekshirish
	async verifyCode(user: IJwtPayload, inputCode: string) {
		try {
			const cachedCode = await this.redis.get(`verify:${user.email}`);

			if (!cachedCode) throw new BadRequestException('Code expired or not found');
			if (cachedCode !== inputCode) throw new BadRequestException('Invalid code');

			await Promise.all([
				this.redis.del(`verify:${user.email}`),
				this.userService.updateEmailStatus(user.sub, true),
				this.basketService.create(user.sub),
			]);
			return
		} catch (error: any) {
			throw error instanceof HttpException
				? error
				: new HttpException(error.message, HttpStatus.BAD_REQUEST);
		}
	};
};