import { MigrationInterface, QueryRunner } from "typeorm";

export class BasketAdd1780203321543 implements MigrationInterface {
    name = 'BasketAdd1780203321543'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "basket_item" ("id" SERIAL NOT NULL, "quantity" integer NOT NULL DEFAULT '1', "basketId" uuid, "productId" uuid, CONSTRAINT "PK_6d46510f73c54c1d75329e1110d" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "basket" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "userId" uuid, CONSTRAINT "REL_26dcb999420495bb5b14a4f8d1" UNIQUE ("userId"), CONSTRAINT "PK_895e6f44b73a72425e434a614cc" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "basket_item" ADD CONSTRAINT "FK_905bbacd09ec186a9232699af68" FOREIGN KEY ("basketId") REFERENCES "basket"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "basket_item" ADD CONSTRAINT "FK_2fb883b2cea0a4043bf4098a309" FOREIGN KEY ("productId") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "basket" ADD CONSTRAINT "FK_26dcb999420495bb5b14a4f8d1c" FOREIGN KEY ("userId") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "basket" DROP CONSTRAINT "FK_26dcb999420495bb5b14a4f8d1c"`);
        await queryRunner.query(`ALTER TABLE "basket_item" DROP CONSTRAINT "FK_2fb883b2cea0a4043bf4098a309"`);
        await queryRunner.query(`ALTER TABLE "basket_item" DROP CONSTRAINT "FK_905bbacd09ec186a9232699af68"`);
        await queryRunner.query(`DROP TABLE "basket"`);
        await queryRunner.query(`DROP TABLE "basket_item"`);
    }

}
