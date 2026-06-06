import { Column, CreateDateColumn, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { User } from "../../users/entities/user.entity";
import { BasketItem } from "./basket-item.entity";

@Entity('basket')
export class Basket {

	@PrimaryGeneratedColumn("uuid")
	id: string

	@OneToOne(() => User, user => user.basket)
	@JoinColumn({ name: 'userId' })
	user: User;

	@Column({ type: "uuid" })
	userId: string;

	@OneToMany(() => BasketItem, item => item.basket)
	items: BasketItem[];

	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;
}