import { BeforeInsert, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { IProduct } from "../../../interfaces";
import { PriceUnit } from "../../../common/enum";
import { Category } from "../../category/entities/category.entity";

@Entity("products")
export class Product implements IProduct {

	@PrimaryGeneratedColumn("uuid")
	id: string

	@Column({ type: "text" })
	productName: string;

	@Column({ type: "text", nullable: true })
	description?: string;

	@Column({ type: "decimal" })
	price: number;

	@Column({ type: "enum", enum: PriceUnit, default: PriceUnit.UZS })
	unit: PriceUnit;

	@Column({ type: "int" })
	quantity: number;

	@Column({ type: "text", unique: true })
	sku: string

	@BeforeInsert()
	generateSku() {
		const prefix = this.productName
			.split(' ')
			.map(word => word[0].toUpperCase())
			.join('')  // "Nike Air Max" → "NAM"

		const random = Math.random().toString(36).substring(2, 6).toUpperCase()  // "X4K2"
		const timestamp = Date.now().toString().slice(-4)  // "3821"

		this.sku = `${prefix}-${random}-${timestamp}`
		// "NAM-X4K2-3821"
	}

	@Column({ type: "boolean", default: true })
	isActive: boolean

	@Column({ type: "text", array: true, default: [] })
	tags: string[]

	@Column({ type: "text", nullable: true })
	productImg?: string;

	@Column({ type: "uuid" })
	categoryId: string;  

	@ManyToOne(() => Category, (category) => category.products, {
		nullable: false,
		onDelete: "CASCADE"
	})
	@JoinColumn({ name: "categoryId" })   // ← Bu muhim!
	category: Category;

	@CreateDateColumn()
	createdAt: Date;

	@UpdateDateColumn()
	updatedAt: Date;
};
