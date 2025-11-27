import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Dish } from '@app/dish/entities/dish.entity';
import { CreateDishDto } from '@app/dish/dto/create-dish.dto';
import { UpdateDishDto } from '@app/dish/dto/update-dish.dto';

@Injectable()
export class DishService {
  constructor(
    @InjectRepository(Dish)
    private readonly dishRepository: Repository<Dish>,
  ) {}

  async create(
    createDishDto: CreateDishDto,
    file?: Express.Multer.File,
  ): Promise<Dish> {
    const dish = this.dishRepository.create(createDishDto);

    if (file) {
      dish.image = `/uploads/dishes/${file.filename}`;
    } else if (!dish.image) {
      dish.image = '';
    }

    return await this.dishRepository.save(dish);
  }

  async findAll(): Promise<Dish[]> {
    return await this.dishRepository.find({
      relations: ['category'],
      order: { orderNumber: 'ASC', id: 'ASC' },
    });
  }

  async findAllPublic(language: string) {
    const dishes = await this.dishRepository.find({
      relations: ['category'],
      order: { orderNumber: 'ASC', id: 'ASC' },
    });

    return dishes.map((dish) => ({
      ...dish,
      name: this.getLocalizedField(dish, 'name', language),
      description: this.getLocalizedField(dish, 'description', language),
      category: {
        ...dish.category,
        name: this.getLocalizedField(dish.category, 'name', language),
      },
    }));
  }

  private getLocalizedField(
    entity: any,
    field: string,
    language: string,
  ): string {
    const localizedField = `${field}_${language}`;
    return entity[localizedField] || entity[field] || '';
  }

  async findOne(id: number): Promise<Dish> {
    const dish = await this.dishRepository.findOne({
      where: { id },
      relations: ['category'],
    });

    if (!dish) {
      throw new NotFoundException(`Dish with ID ${id} not found`);
    }

    return dish;
  }

  async findByCategoryId(categoryId: number): Promise<Dish[]> {
    return await this.dishRepository.find({
      where: { category_id: categoryId },
      relations: ['category'],
      order: { orderNumber: 'ASC', id: 'ASC' },
    });
  }

  async update(
    id: number,
    updateDishDto: UpdateDishDto,
    file?: Express.Multer.File,
  ): Promise<Dish> {
    const dish = await this.dishRepository.preload({
      id: id,
      ...updateDishDto,
    });

    if (!dish) {
      throw new NotFoundException(`Dish with ID ${id} not found`);
    }
    if (file) {
      dish.image = `/uploads/dishes/${file.filename}`;
    }

    return await this.dishRepository.save(dish);
  }

  async remove(id: number): Promise<void> {
    const result = await this.dishRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Dish with ID ${id} not found`);
    }
  }
}
