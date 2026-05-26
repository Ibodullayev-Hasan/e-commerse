import { MigrationInterface, QueryRunner } from "typeorm";

export class ProductEntityUpdated1779815535428 implements MigrationInterface {
    name = 'ProductEntityUpdated1779815535428'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "categories" DROP CONSTRAINT "FK_a342330beee0692348a079aa13a"`);
        await queryRunner.query(`ALTER TABLE "categories" DROP COLUMN "productsId"`);
        await queryRunner.query(`ALTER TABLE "products" ADD "categoryId" uuid NOT NULL`);
        await queryRunner.query(`ALTER TABLE "products" ADD CONSTRAINT "FK_ff56834e735fa78a15d0cf21926" FOREIGN KEY ("categoryId") REFERENCES "categories"("id") ON DELETE CASCADE ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" DROP CONSTRAINT "FK_ff56834e735fa78a15d0cf21926"`);
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "categoryId"`);
        await queryRunner.query(`ALTER TABLE "categories" ADD "productsId" uuid`);
        await queryRunner.query(`ALTER TABLE "categories" ADD CONSTRAINT "FK_a342330beee0692348a079aa13a" FOREIGN KEY ("productsId") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
