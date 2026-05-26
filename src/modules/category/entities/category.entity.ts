import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Product } from "../../product/entities/product.entity";

@Entity("categories")
export class Category {

	@PrimaryGeneratedColumn("uuid")
	id: string

	@Column({ type: "text", unique: true })
	categoryName: string;

	@Column({ type: "text", nullable:true})
	brend: string;

	@Column({ type: "text", nullable: true })
	description?: string;

	@Column({ type: "text", nullable: true })
	categoryImg?: string;

	@OneToMany(() => Product, (product) => product.category)
	products: Product[];

	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;
}
