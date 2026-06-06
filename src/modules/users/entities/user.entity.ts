import { Column, CreateDateColumn, Entity, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { IUser } from "../../../interfaces";
import { UserRole, UserStatus } from "../../../common/enum";
import { Basket } from "../../basket/entities/basket.entity";

@Entity("users")
export class User implements IUser {

	@PrimaryGeneratedColumn("uuid")
	id: string

	@Column({ type: "text" })
	fullName: string;

	@Column({ type: "text", select: false, nullable: true })
	hashedPassword?: string;

	@Column({ type: "text", unique: true })
	email: string;

	@Column({ type: "boolean", default: false })
	emailVerifed?: boolean;

	@Column({ type: "varchar", length: 13, nullable: true })
	phoneNumber?: string;

	@Column({ type: "enum", enum: UserRole, default: UserRole.GUEST })
	role: UserRole;

	@Column({ type: "boolean", default: false })
	isBlocked: boolean;

	@Column({ type: "enum", enum: UserStatus, default: UserStatus.INACTIVE })
	status: UserStatus;

	@OneToOne(() => Basket, basket => basket.user)
	basket: Basket

	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;
}
