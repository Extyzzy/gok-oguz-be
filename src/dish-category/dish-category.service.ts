
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DishCategory } from '@app/dish-category/entities/dish-category.entity';
import { CreateDishCategoryDto } from '@app/dish-category/dto/create-dish-category.dto';
import { UpdateDishCategoryDto } from '@app/dish-category/dto/update-dish-category.dto';
import { Dish } from '@app/dish/entities/dish.entity';

@Injectable()
export class DishCategoryService {

  constructor(
    @InjectRepository(DishCategory)
    private readonly dishCategoryRepository: Repository<DishCategory>,
    @InjectRepository(Dish)
    private readonly dishRepository: Repository<Dish>,
  ) {}

  create(createDishCategoryDto: CreateDishCategoryDto, file?: Express.Multer.File) {

    const dishCategory = this.dishCategoryRepository.create(
      createDishCategoryDto,
    );

    if (file) {
      dishCategory.categoryImage = file?.buffer;
      dishCategory.filename = file?.originalname;
      dishCategory.mimetype = file?.mimetype;
    }

    return this.dishCategoryRepository.save(dishCategory);

  }
  async findAll() {
    return await this.dishCategoryRepository.find({
      relations: ['dishes'],
      order: { orderNumber: 'ASC', id: 'ASC' },
    });
  }
  async findDishesBySlug(slug: string) {

    return this.dishRepository.find({
      where: { category: { slug } },
      order: { orderNumber: 'ASC', id: 'ASC' },
    });
  }
  async findOne(id: number) {

    const dishCategory = await this.dishCategoryRepository.findOne({
      where: { id },
    });

    if (!dishCategory) {
      throw new NotFoundException(`DishCategory with ID ${id} not found`);
    }

    return dishCategory;
  }
  async update(id: number, updateDishCategoryDto: UpdateDishCategoryDto, file?: Express.Multer.File) {

    const dishCategory = await this.dishCategoryRepository.preload({
      id: id,
      ...updateDishCategoryDto,
    });

    if (!dishCategory) {
      throw new NotFoundException(`DishCategory with ID ${id} not found`);
    }

    if (file) {
      dishCategory.categoryImage = file.buffer;
      dishCategory.filename = file.originalname;
      dishCategory.mimetype = file.mimetype;
    }

    return await this.dishCategoryRepository.update(id, dishCategory);
  }

  async remove(id: number) {
    const result = await this.dishCategoryRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Dish with ID ${id} not found`);
    }
  }
}
