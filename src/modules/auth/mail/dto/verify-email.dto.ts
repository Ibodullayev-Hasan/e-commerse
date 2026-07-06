import { IsNotEmpty, IsString } from "class-validator";

export class VerifyCodeDto {
	
	@IsNotEmpty({ message: `code majburiy` })
	@IsString()
	code: string
}