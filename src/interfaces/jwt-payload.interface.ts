import { UserRole } from "../common/enum"

export interface IJwtPayload {
	sub: string
	email: string
	role: UserRole
}