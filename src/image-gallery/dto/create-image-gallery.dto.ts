import { IsNotEmpty, IsString } from 'class-validator';

export class CreateImageGalleryDto {
  @IsNotEmpty()
  image: Buffer; // Двоичные данные изображения

  @IsString()
  @IsNotEmpty()
  imageFileName: string; // Имя файла

  @IsString()
  @IsNotEmpty()
  imageMimeType: string; // MIME-тип изображения
}