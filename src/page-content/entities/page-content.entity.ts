import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class PageContent {
  @PrimaryGeneratedColumn()
  id: number;

  // Wine names
  @Column({ default: 'Cabernet Sauvignon' })
  wine1: string;

  @Column({ default: 'Merlot' })
  wine2: string;

  @Column({ default: 'Syrah/Shiraz' })
  wine3: string;

  @Column({ default: 'Pinot Noir' })
  wine4: string;

  // Home section
  @Column({ type: 'text' })
  home_main_text_en: string;

  @Column({ type: 'text' })
  home_main_text_ro: string;

  @Column({ type: 'text' })
  home_main_text_ru: string;

  @Column({ type: 'text' })
  home_main_description_en: string;

  @Column({ type: 'text' })
  home_main_description_ro: string;

  @Column({ type: 'text' })
  home_main_description_ru: string;

  @Column({ type: 'text' })
  home_traditions_title_en: string;

  @Column({ type: 'text' })
  home_traditions_title_ro: string;

  @Column({ type: 'text' })
  home_traditions_title_ru: string;

  @Column({ type: 'text' })
  home_traditions_text_en: string;

  @Column({ type: 'text' })
  home_traditions_text_ro: string;

  @Column({ type: 'text' })
  home_traditions_text_ru: string;

  @Column({ type: 'text' })
  home_traditions_wines_en: string;

  @Column({ type: 'text' })
  home_traditions_wines_ro: string;

  @Column({ type: 'text' })
  home_traditions_wines_ru: string;

  // Photos section
  @Column({ type: 'text' })
  photos_photo_title_en: string;

  @Column({ type: 'text' })
  photos_photo_title_ro: string;

  @Column({ type: 'text' })
  photos_photo_title_ru: string;

  @Column({ type: 'text' })
  photos_restaurant_description_en: string;

  @Column({ type: 'text' })
  photos_restaurant_description_ro: string;

  @Column({ type: 'text' })
  photos_restaurant_description_ru: string;

  @Column({ type: 'text' })
  photos_restaurant_atmosphere_en: string;

  @Column({ type: 'text' })
  photos_restaurant_atmosphere_ro: string;

  @Column({ type: 'text' })
  photos_restaurant_atmosphere_ru: string;

  // Gagauz culture section
  @Column({ type: 'text' })
  gagauz_culture_title_en: string;

  @Column({ type: 'text' })
  gagauz_culture_title_ro: string;

  @Column({ type: 'text' })
  gagauz_culture_title_ru: string;

  @Column({ type: 'text' })
  gagauz_culture_location_en: string;

  @Column({ type: 'text' })
  gagauz_culture_location_ro: string;

  @Column({ type: 'text' })
  gagauz_culture_location_ru: string;

  @Column({ type: 'text' })
  gagauz_culture_languages_en: string;

  @Column({ type: 'text' })
  gagauz_culture_languages_ro: string;

  @Column({ type: 'text' })
  gagauz_culture_languages_ru: string;

  @Column({ type: 'text' })
  gagauz_culture_example_en: string;

  @Column({ type: 'text' })
  gagauz_culture_example_ro: string;

  @Column({ type: 'text' })
  gagauz_culture_example_ru: string;

  // Home slider images
  @Column({ type: 'jsonb', default: '[]' })
  images: string[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}

