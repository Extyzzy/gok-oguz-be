import { MigrationInterface, QueryRunner } from 'typeorm';

export class CreatePageContent1764014294000 implements MigrationInterface {
  name = 'CreatePageContent1764014294000';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
      CREATE TABLE "page_content" (
        "id" SERIAL NOT NULL,
        "wine1" character varying NOT NULL DEFAULT 'Cabernet Sauvignon',
        "wine2" character varying NOT NULL DEFAULT 'Merlot',
        "wine3" character varying NOT NULL DEFAULT 'Syrah/Shiraz',
        "wine4" character varying NOT NULL DEFAULT 'Pinot Noir',
        "home_main_text_en" text NOT NULL,
        "home_main_text_ro" text NOT NULL,
        "home_main_text_ru" text NOT NULL,
        "home_main_description_en" text NOT NULL,
        "home_main_description_ro" text NOT NULL,
        "home_main_description_ru" text NOT NULL,
        "home_traditions_title_en" text NOT NULL,
        "home_traditions_title_ro" text NOT NULL,
        "home_traditions_title_ru" text NOT NULL,
        "home_traditions_text_en" text NOT NULL,
        "home_traditions_text_ro" text NOT NULL,
        "home_traditions_text_ru" text NOT NULL,
        "home_traditions_wines_en" text NOT NULL,
        "home_traditions_wines_ro" text NOT NULL,
        "home_traditions_wines_ru" text NOT NULL,
        "photos_photo_title_en" text NOT NULL,
        "photos_photo_title_ro" text NOT NULL,
        "photos_photo_title_ru" text NOT NULL,
        "photos_restaurant_description_en" text NOT NULL,
        "photos_restaurant_description_ro" text NOT NULL,
        "photos_restaurant_description_ru" text NOT NULL,
        "photos_restaurant_atmosphere_en" text NOT NULL,
        "photos_restaurant_atmosphere_ro" text NOT NULL,
        "photos_restaurant_atmosphere_ru" text NOT NULL,
        "gagauz_culture_title_en" text NOT NULL,
        "gagauz_culture_title_ro" text NOT NULL,
        "gagauz_culture_title_ru" text NOT NULL,
        "gagauz_culture_location_en" text NOT NULL,
        "gagauz_culture_location_ro" text NOT NULL,
        "gagauz_culture_location_ru" text NOT NULL,
        "gagauz_culture_languages_en" text NOT NULL,
        "gagauz_culture_languages_ro" text NOT NULL,
        "gagauz_culture_languages_ru" text NOT NULL,
        "gagauz_culture_example_en" text NOT NULL,
        "gagauz_culture_example_ro" text NOT NULL,
        "gagauz_culture_example_ru" text NOT NULL,
        "createdAt" TIMESTAMP NOT NULL DEFAULT now(),
        "updatedAt" TIMESTAMP NOT NULL DEFAULT now(),
        CONSTRAINT "PK_page_content" PRIMARY KEY ("id")
      )
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "page_content"`);
  }
}

