import { IsEmail, IsNotEmpty, IsString, Matches, MinLength } from "class-validator"

export class LoginDto {

	@IsNotEmpty()
	@IsString()
	@MinLength(6, { message: `Kamida 6 xonadan iborat bo'lsin` })
	@Matches(
		/^(?=.*[A-Z])(?=.*[a-z]{2,})(?=.*\d{3,}).+$/,
		{ message: `Kamida 1 ta katta harf, 2 ta kichik harf va 3 ta raqam bo'lsin: Jon123` }
	)
	password?: string

	@IsEmail()
	@IsNotEmpty({ message: `Email majburiy` })
	email: string
}
