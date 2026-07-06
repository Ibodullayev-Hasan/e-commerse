import { Body, Controller, HttpCode, Post, Req, UseGuards } from '@nestjs/common';
import { MailService } from './mail.service';
import { JwtGuard } from '../guards';
import { res } from '../../../common/helper';
import { VerifyCodeDto } from './dto/verify-email.dto';
import { CurrentUser } from '../../../common/decorators';
import { IJwtPayload } from '../../../interfaces';

@UseGuards(JwtGuard)
@Controller('mail')
export class MailController {

	constructor(
		private readonly mailService: MailService
	) { }

	@Post('send-code')
	@HttpCode(200)
	async sendCode(@CurrentUser() user: IJwtPayload) {
		await this.mailService.sendVerification(user.email);

		return res(`Kod jo'natildi`)
	};

	@Post('verify')
	@HttpCode(200)
	async verifyCode(@Body() dto: VerifyCodeDto, @CurrentUser() user: IJwtPayload) {
		await this.mailService.verifyCode(user, dto.code);

		return res('Email verified successfully');
	}
}
