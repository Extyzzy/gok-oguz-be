import { Transform } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateDishDto {
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

  @IsString()
  @IsNotEmpty()
  description_en: string;

  @IsString()
  @IsNotEmpty()
  description_ro: string;

  @IsString()
  @IsNotEmpty()
  description_ru: string;

  @IsNumber()
  @IsNotEmpty()
  @Transform(({ value }: { value: string }) => parseFloat(value) * 100)
  price: number;

  @IsNumber()
  @IsNotEmpty()
  @Transform(({ value }: { value: string }) => parseFloat(value) * 100)
  weight: number;

  @IsString()
  @IsOptional()
  image?: string;

  @IsNumber()
  @IsNotEmpty()
  @Transform(({ value }: { value: string }) => parseFloat(value))
  category_id: number;
}
