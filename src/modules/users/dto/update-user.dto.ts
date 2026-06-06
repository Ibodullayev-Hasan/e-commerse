import { IsEmail, IsOptional, IsString, Length } from "class-validator"


export class UpdateUserDto {
	@IsOptional()
	@Length(3, 25, { message: "Ism-familiya kamida 3 harf bolishi mumkin, misol: Ali Aliyev" })
	@IsString({ message: `Faqat text formatda` })
	fullName: string


	@IsEmail()
	@IsOptional()
	email: string

	@IsString()
	@IsOptional()
	phoneNumber: string
}
