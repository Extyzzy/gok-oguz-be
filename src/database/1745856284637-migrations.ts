import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1745856284637 implements MigrationInterface {
    name = 'Migrations1745856284637'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "dish" ALTER COLUMN "image" DROP NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "dish" ALTER COLUMN "image" SET NOT NULL`);
    }

}
