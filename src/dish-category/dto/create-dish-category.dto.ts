import { IsNotEmpty, IsString, IsOptional } from 'class-validator';

export class CreateDishCategoryDto {
  @IsString()
  @IsNotEmpty()
  slug: string;

  @IsString()
  @IsNotEmpty()
  name_en: string;

  @IsString()
  @IsNotEmpty()
  name_ro: string;

  @IsString()
  @IsNotEmpty()
  name_ru: string;

/*
  @IsString()
  @IsOptional()
  image?: string;
*/
}

