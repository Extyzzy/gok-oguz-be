import { MigrationInterface, QueryRunner } from 'typeorm';

export class Init1745263221941 implements MigrationInterface {
  name = 'Init1745263221941';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "user" ("id" SERIAL NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "firstName" character varying NOT NULL, "lastName" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE ("email"), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "dish" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "name_en" character varying NOT NULL, "name_ro" character varying NOT NULL, "name_ru" character varying NOT NULL, "description_en" text NOT NULL, "description_ro" text NOT NULL, "description_ru" text NOT NULL, "price" integer NOT NULL, "weight" integer NOT NULL, "image" character varying NOT NULL, "category_id" integer, CONSTRAINT "PK_59ac7b35af39b231276bfc4c00c" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "dish_category" ("id" SERIAL NOT NULL, "name" character varying NOT NULL, "name_en" character varying NOT NULL, "name_ro" character varying NOT NULL, "name_ru" character varying NOT NULL, CONSTRAINT "PK_99a7f8da03e95489210ec2c8ed8" PRIMARY KEY ("id"))`,
    );
    await queryRunner.query(
      `ALTER TABLE "dish" ADD CONSTRAINT "FK_99a7f8da03e95489210ec2c8ed8" FOREIGN KEY ("category_id") REFERENCES "dish_category"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "dish" DROP CONSTRAINT "FK_99a7f8da03e95489210ec2c8ed8"`,
    );
    await queryRunner.query(`DROP TABLE "dish_category"`);
    await queryRunner.query(`DROP TABLE "dish"`);
    await queryRunner.query(`DROP TABLE "user"`);
  }
}
