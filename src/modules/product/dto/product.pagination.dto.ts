import { Type } from "class-transformer";
import { IsIn, IsOptional, IsPositive, Max, Min } from "class-validator";

export class ProductPaginationDto {
	@IsOptional()
	@Type(() => Number)
	@IsPositive()
	@Min(1)
	page?: number = 1;

	@IsOptional()
	@Type(() => Number)
	@IsPositive()
	@Max(100)
	limit?: number = 20;

	@IsOptional()
	@IsIn(['ASC', 'DESC'])
	order?: 'ASC' | 'DESC' = 'DESC';
}