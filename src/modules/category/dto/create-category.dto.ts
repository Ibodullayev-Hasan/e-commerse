import { IsNotEmpty, IsOptional, IsString, IsUrl } from "class-validator";

export class CreateCategoryDto {
	@IsString()
	@IsNotEmpty()
	categoryName: string

	@IsString()
	@IsOptional()
	brend: string

	@IsString()
	@IsOptional()
	description: string

	@IsUrl()
	@IsOptional()
	productImg: string
}
