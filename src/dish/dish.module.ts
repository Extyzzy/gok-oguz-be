import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DishService } from '@app/dish/dish.service';
import { DishController } from '@app/dish/dish.controller';
import { Dish } from '@app/dish/entities/dish.entity';
import { DishCategory } from '@app/dish-category/entities/dish-category.entity';
import { DishCategoryService } from '@app/dish-category/dish-category.service';

@Module({
  imports: [TypeOrmModule.forFeature([Dish, DishCategory])],
  controllers: [DishController],
  providers: [DishService, DishCategoryService],
  exports: [DishService],
})
export class DishModule {}
