import { MigrationInterface, QueryRunner } from "typeorm";

export class ProductEntityUpdated1779816464998 implements MigrationInterface {
    name = 'ProductEntityUpdated1779816464998'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "categories" ADD "brend" text`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "categories" DROP COLUMN "brend"`);
    }

}
