import { MigrationInterface, QueryRunner } from "typeorm";

export class UpdatedBasketEntity1780726433009 implements MigrationInterface {
    name = 'UpdatedBasketEntity1780726433009'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "basket" DROP CONSTRAINT "FK_26dcb999420495bb5b14a4f8d1c"`);
        await queryRunner.query(`ALTER TABLE "basket" ALTER COLUMN "userId" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "basket" ADD CONSTRAINT "FK_26dcb999420495bb5b14a4f8d1c" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "basket" DROP CONSTRAINT "FK_26dcb999420495bb5b14a4f8d1c"`);
        await queryRunner.query(`ALTER TABLE "basket" ALTER COLUMN "userId" DROP NOT NULL`);
        await queryRunner.query(`ALTER TABLE "basket" ADD CONSTRAINT "FK_26dcb999420495bb5b14a4f8d1c" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
