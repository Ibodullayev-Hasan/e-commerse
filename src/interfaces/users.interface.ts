import { UserRole } from "../common/enum"

export interface IUser {
	fullName: string
	hashedPassword?: string
	email: string
	role:UserRole
	emailVerifed?: boolean
	phoneNumber?: string
};