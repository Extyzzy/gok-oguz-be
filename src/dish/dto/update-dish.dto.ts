import { PartialType } from '@nestjs/mapped-types';
import { CreateDishDto } from '@app/dish/dto/create-dish.dto';

export class UpdateDishDto extends PartialType(CreateDishDto) {}
