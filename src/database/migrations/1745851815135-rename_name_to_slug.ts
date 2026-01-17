import { MigrationInterface, QueryRunner } from "typeorm";

export class RenameNameToSlug1745851815135 implements MigrationInterface {
    name = 'RenameNameToSlug1745851815135'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "dish" RENAME COLUMN "name" TO "slug"`);
        await queryRunner.query(`ALTER TABLE "dish_category" DROP COLUMN "name"`);
        await queryRunner.query(`ALTER TABLE "dish_category" ADD "slug" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "dish_category" ADD "image" character varying`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "dish_category" DROP COLUMN "image"`);
        await queryRunner.query(`ALTER TABLE "dish_category" DROP COLUMN "slug"`);
        await queryRunner.query(`ALTER TABLE "dish_category" ADD "name" character varying NOT NULL`);
        await queryRunner.query(`ALTER TABLE "dish" RENAME COLUMN "slug" TO "name"`);
    }

}
