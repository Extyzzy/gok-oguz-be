import { IsString, IsOptional, IsArray } from 'class-validator';

export class UpdatePageContentDto {
  // Wine names
  @IsString()
  @IsOptional()
  wine1?: string;

  @IsString()
  @IsOptional()
  wine2?: string;

  @IsString()
  @IsOptional()
  wine3?: string;

  @IsString()
  @IsOptional()
  wine4?: string;

  // Home section
  @IsString()
  @IsOptional()
  home_main_text_en?: string;

  @IsString()
  @IsOptional()
  home_main_text_ro?: string;

  @IsString()
  @IsOptional()
  home_main_text_ru?: string;

  @IsString()
  @IsOptional()
  home_main_description_en?: string;

  @IsString()
  @IsOptional()
  home_main_description_ro?: string;

  @IsString()
  @IsOptional()
  home_main_description_ru?: string;

  @IsString()
  @IsOptional()
  home_traditions_title_en?: string;

  @IsString()
  @IsOptional()
  home_traditions_title_ro?: string;

  @IsString()
  @IsOptional()
  home_traditions_title_ru?: string;

  @IsString()
  @IsOptional()
  home_traditions_text_en?: string;

  @IsString()
  @IsOptional()
  home_traditions_text_ro?: string;

  @IsString()
  @IsOptional()
  home_traditions_text_ru?: string;

  @IsString()
  @IsOptional()
  home_traditions_wines_en?: string;

  @IsString()
  @IsOptional()
  home_traditions_wines_ro?: string;

  @IsString()
  @IsOptional()
  home_traditions_wines_ru?: string;

  // Photos section
  @IsString()
  @IsOptional()
  photos_photo_title_en?: string;

  @IsString()
  @IsOptional()
  photos_photo_title_ro?: string;

  @IsString()
  @IsOptional()
  photos_photo_title_ru?: string;

  @IsString()
  @IsOptional()
  photos_restaurant_description_en?: string;

  @IsString()
  @IsOptional()
  photos_restaurant_description_ro?: string;

  @IsString()
  @IsOptional()
  photos_restaurant_description_ru?: string;

  @IsString()
  @IsOptional()
  photos_restaurant_atmosphere_en?: string;

  @IsString()
  @IsOptional()
  photos_restaurant_atmosphere_ro?: string;

  @IsString()
  @IsOptional()
  photos_restaurant_atmosphere_ru?: string;

  // Gagauz culture section
  @IsString()
  @IsOptional()
  gagauz_culture_title_en?: string;

  @IsString()
  @IsOptional()
  gagauz_culture_title_ro?: string;

  @IsString()
  @IsOptional()
  gagauz_culture_title_ru?: string;

  @IsString()
  @IsOptional()
  gagauz_culture_location_en?: string;

  @IsString()
  @IsOptional()
  gagauz_culture_location_ro?: string;

  @IsString()
  @IsOptional()
  gagauz_culture_location_ru?: string;

  @IsString()
  @IsOptional()
  gagauz_culture_languages_en?: string;

  @IsString()
  @IsOptional()
  gagauz_culture_languages_ro?: string;

  @IsString()
  @IsOptional()
  gagauz_culture_languages_ru?: string;

  @IsString()
  @IsOptional()
  gagauz_culture_example_en?: string;

  @IsString()
  @IsOptional()
  gagauz_culture_example_ro?: string;

  @IsString()
  @IsOptional()
  gagauz_culture_example_ru?: string;

  // Home slider images
  @IsArray()
  @IsOptional()
  images?: string[];
}

