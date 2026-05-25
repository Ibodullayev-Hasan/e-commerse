import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, Length, Matches, MinLength } from "class-validator";
import { UserRole } from "../../../common/enum";

export class CreateUserDto {

	@IsNotEmpty({ message: "Ism-familiya majburiy" })
	@Length(3, 25, { message: "Ism-familiya kamida 3 harf bolishi mumkin, misol: Ali Aliyev" })
	@IsString({ message: `Faqat text formatda` })
	fullName: string

	@IsOptional()
	@IsString()
	@MinLength(6, { message: `Kamida 6 xonadan iborat bo'lsin` })
	@Matches(
		/^(?=.*[A-Z])(?=.*[a-z]{2,})(?=.*\d{3,}).+$/,
		{ message: `Kamida 1 ta katta harf, 2 ta kichik harf va 3 ta raqam bo'lsin:  Jon123` }
	)
	password?: string

	@IsEmail()
	@IsNotEmpty({ message: `Email majburiy` })
	email: string

	@IsString()
	@IsOptional()
	phoneNumber: string

	@IsOptional()
	@IsEnum(UserRole)
	role: UserRole
}
