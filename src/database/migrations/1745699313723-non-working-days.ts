import { MigrationInterface, QueryRunner } from "typeorm";

export class NonWorkingDays1745699313723 implements MigrationInterface {
    name = 'NonWorkingDays1745699313723'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "non_working_days" ("id" SERIAL NOT NULL, "firstDay" TIMESTAMP, "numOfDays" integer NOT NULL, CONSTRAINT "PK_5b1f255745db7a618705de83faf" PRIMARY KEY ("id"))`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE "non_working_days"`);
    }

}
