import { Type } from "class-transformer";
import { IsArray, IsEnum, IsNotEmpty, IsOptional, IsPositive, IsString, IsUrl, IsUUID } from "class-validator";
import { PriceUnit } from "../../../common/enum";
import { Category } from "../../category/entities/category.entity";

export class CreateProductDto {

	@IsUUID()
	@IsNotEmpty()
	categoryId: string

	@IsString()
	@IsNotEmpty()
	productName: string

	@Type(() => Number)
	@IsPositive()
	@IsNotEmpty()
	price: number

	@IsEnum(PriceUnit)
	@IsOptional()
	unit: PriceUnit = PriceUnit.UZS

	@Type(() => Number)
	@IsPositive()
	@IsNotEmpty()
	quantity: number

	@IsString()
	@IsOptional()
	description: string

	@IsUrl()
	@IsOptional()
	productImg: string

	@IsArray()
	@IsString({ each: true })
	@IsOptional()
	tags: string[] = []
}
