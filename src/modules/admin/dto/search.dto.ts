import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber, IsOptional, IsString, Length } from "class-validator";

export class SearchDto {

	@IsNotEmpty({ message: "Ism-familiya bo'sh bo'lmasligi kerak" })
	@Length(3, 25, { message: "Kamida 3 ta harf bo'lishi kerak" })
	@IsString({ message: "Faqat text formatda" })
	fullName: string

	@Type(() => Number)
	@IsNumber()
	@IsOptional()
	limit?: number = 10;

	@Type(() => Number)
	@IsNumber()
	@IsOptional()
	offset?: number = 0;
}