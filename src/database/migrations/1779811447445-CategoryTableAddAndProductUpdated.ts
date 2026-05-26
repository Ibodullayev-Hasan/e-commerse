import { MigrationInterface, QueryRunner } from "typeorm";

export class CategoryTableAddAndProductUpdated1779811447445 implements MigrationInterface {
    name = 'CategoryTableAddAndProductUpdated1779811447445'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "categories" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "categoryName" text NOT NULL, "description" text, "categoryImg" text, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), "productsId" uuid, CONSTRAINT "UQ_f46afc39e51f518a78cbe94cb90" UNIQUE ("categoryName"), CONSTRAINT "PK_24dbc6126a28ff948da33e97d3b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "categories" ADD CONSTRAINT "FK_a342330beee0692348a079aa13a" FOREIGN KEY ("productsId") REFERENCES "products"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "categories" DROP CONSTRAINT "FK_a342330beee0692348a079aa13a"`);
        await queryRunner.query(`DROP TABLE "categories"`);
    }

}
