import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DishCategory } from './entities/dish-category.entity';
import { DishCategoryService } from './dish-category.service';
import { DishCategoryController } from './dish-category.controller';

@Module({
  imports: [TypeOrmModule.forFeature([DishCategory])],
  controllers: [DishCategoryController],
  providers: [DishCategoryService]
})
export class DishCategoryModule {}
