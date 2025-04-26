import { PartialType } from '@nestjs/mapped-types';
import { CreateDishCategoryDto } from '@app/dish-category/dto/create-dish-category.dto';

export class UpdateDishCategoryDto extends PartialType(CreateDishCategoryDto) {}
