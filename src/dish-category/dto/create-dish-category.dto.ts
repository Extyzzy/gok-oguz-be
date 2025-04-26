import { IsNotEmpty, IsString } from 'class-validator';

export class CreateDishCategoryDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  name_en: string;

  @IsString()
  @IsNotEmpty()
  name_ro: string;

  @IsString()
  @IsNotEmpty()
  name_ru: string;
}
