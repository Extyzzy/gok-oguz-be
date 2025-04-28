import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1745847084155 implements MigrationInterface {
    name = 'Migrations1745847084155'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "dish_category" ADD "image" character varying NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "dish_category" DROP COLUMN "image"`);
    }

}
