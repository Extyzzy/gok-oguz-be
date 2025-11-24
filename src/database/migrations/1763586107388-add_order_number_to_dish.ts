import { MigrationInterface, QueryRunner } from "typeorm";

export class AddOrderNumberToDish1763586107388 implements MigrationInterface {
    name = 'AddOrderNumberToDish1763586107388'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "dish" ADD "orderNumber" integer NOT NULL DEFAULT '0'`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "dish" DROP COLUMN "orderNumber"`);
    }

}
