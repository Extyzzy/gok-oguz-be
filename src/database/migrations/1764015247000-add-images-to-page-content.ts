import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddImagesToPageContent1764015247000 implements MigrationInterface {
  name = 'AddImagesToPageContent1764015247000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      ALTER TABLE "page_content" 
      ADD COLUMN "images" jsonb NOT NULL DEFAULT '[]'::jsonb
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "page_content" DROP COLUMN "images"`);
  }
}

