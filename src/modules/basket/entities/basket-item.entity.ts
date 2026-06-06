import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Basket } from "./basket.entity";
import { Product } from "../../product/entities/product.entity";

@Entity()
export class BasketItem {
	@PrimaryGeneratedColumn()
	id: number;

	@ManyToOne(() => Basket, basket => basket.items)
	basket: Basket;

	@ManyToOne(() => Product)
	product: Product;

	@Column({ default: 1 })
	quantity: number;
}