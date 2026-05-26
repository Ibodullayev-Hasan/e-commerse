import { MigrationInterface, QueryRunner } from "typeorm";

export class ProductTableAdd1779810209864 implements MigrationInterface {
    name = 'ProductTableAdd1779810209864'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TYPE "public"."products_unit_enum" AS ENUM('usd', 'uzs', 'rub')`);
        await queryRunner.query(`CREATE TABLE "products" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "productName" text NOT NULL, "description" text, "price" numeric NOT NULL, "unit" "public"."products_unit_enum" NOT NULL DEFAULT 'uzs', "quantity" integer NOT NULL, "productImg" text, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "products"`);
        await queryRunner.query(`DROP TYPE "public"."products_unit_enum"`);
    }

}
