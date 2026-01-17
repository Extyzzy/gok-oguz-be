import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DishCategoryService } from '@app/dish-category/dish-category.service';
import { DishCategoryController } from '@app/dish-category/dish-category.controller';
import { DishCategory } from '@app/dish-category/entities/dish-category.entity';
import { Dish } from '@app/dish/entities/dish.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Dish, DishCategory])],
  controllers: [DishCategoryController],
  providers: [DishCategoryService],
  exports: [DishCategoryService],
})
export class DishCategoryModule {}
