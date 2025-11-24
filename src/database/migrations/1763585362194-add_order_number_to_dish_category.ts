import { MigrationInterface, QueryRunner } from "typeorm";

export class AddOrderNumberToDishCategory1763585362194 implements MigrationInterface {
    name = 'AddOrderNumberToDishCategory1763585362194'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "dish_category" ADD "orderNumber" integer NOT NULL DEFAULT '0'`);
        await queryRunner.query(`ALTER TABLE "dish" ALTER COLUMN "image" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "dish" ALTER COLUMN "image" SET NOT NULL`);
        await queryRunner.query(`ALTER TABLE "dish_category" DROP COLUMN "orderNumber"`);
    }

}
