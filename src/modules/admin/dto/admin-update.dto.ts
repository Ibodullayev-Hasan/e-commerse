import { IsOptional } from "class-validator";
import { UserRole } from "../../../common/enum";

export class AdminUpdateUserDto {
	@IsOptional()
	role?: UserRole;

	@IsOptional()
	isBlocked?: boolean;
}