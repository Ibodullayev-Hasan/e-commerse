import { PriceUnit } from "../common/enum"

export interface IBase {
	id: string
	createdAt: Date
	updatedAt: Date
};

export interface IProduct extends IBase {
	productName: string
	price: number
	unit?: PriceUnit
	quantity:number
	description?: string
	productImg?: string
}