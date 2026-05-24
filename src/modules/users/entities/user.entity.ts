import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import { IUser } from "../../../interfaces";

@Entity("users")
export class User implements IUser {

	@PrimaryGeneratedColumn("uuid")
	id: string

	@Column({ type: "text" })
	fullName: string;

	@Column({ type: "text", select: false, nullable: true })
	password?: string;

	@Column("text")
	email: string;

	@Column({ type: "boolean", default: false })
	emailVerifed?: boolean;

	@Column({ type: "varchar", length: 13, nullable: true })
	phoneNumber?: string;
}
