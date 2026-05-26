import { MigrationInterface, QueryRunner } from "typeorm";

export class ProductEntityUpdated1779810909544 implements MigrationInterface {
    name = 'ProductEntityUpdated1779810909544'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" ADD "sku" text NOT NULL`);
        await queryRunner.query(`ALTER TABLE "products" ADD CONSTRAINT "UQ_c44ac33a05b144dd0d9ddcf9327" UNIQUE ("sku")`);
        await queryRunner.query(`ALTER TABLE "products" ADD "isActive" boolean NOT NULL DEFAULT true`);
        await queryRunner.query(`ALTER TABLE "products" ADD "tags" text array NOT NULL DEFAULT '{}'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "tags"`);
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "isActive"`);
        await queryRunner.query(`ALTER TABLE "products" DROP CONSTRAINT "UQ_c44ac33a05b144dd0d9ddcf9327"`);
        await queryRunner.query(`ALTER TABLE "products" DROP COLUMN "sku"`);
    }

}
