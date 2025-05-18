import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Dish } from '@app/dish/entities/dish.entity';
import { CreateDishDto } from '@app/dish/dto/create-dish.dto';
import { UpdateDishDto } from '@app/dish/dto/update-dish.dto';

@Injectable()
export class DishService {

  //region: constructor(
  constructor(
    @InjectRepository(Dish)
    private readonly dishRepository: Repository<Dish>,
  ) {}
  //endregion

  //region: create(createDishDto: CreateDishDto)
  async create(createDishDto: CreateDishDto, file: Express.Multer.File): Promise<Dish> {
      console.log("dish.service.ts - create()...");
    console.log("\tdish.service.ts - create() - createDishDto: ", createDishDto);
    console.log("\tdish.service.ts - create() - file.originalname: ", file.originalname);

    const dish = this.dishRepository.create(createDishDto);
    console.log("\tdish.service.ts - create() - dish: ", dish);

    dish.categoryImage = file.buffer;
    dish.filename = file.originalname;
    dish.mimetype = file.mimetype;

    console.log("\tdish.service.ts - create() - dish: ", dish);

    return await this.dishRepository.save(dish);
  }
  //endregion

  //region: findAll()
  async findAll(): Promise<Dish[]> {
    return await this.dishRepository.find({
      relations: ['category'],
      order: { id: 'ASC' },
    });
  }
  //endregion

  //region: findAllPublic(language: string)
  async findAllPublic(language: string) {
    const dishes = await this.dishRepository.find({
      relations: ['category'],
      order: { id: 'ASC' },
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
  //endregion

  //region: findOne(id: number)
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
  //endregion

  //region: findByCategoryId(categoryId: number)
  async findByCategoryId(categoryId: number): Promise<Dish[]> {
    return await this.dishRepository.find({
      where: { category_id: categoryId },
      relations: ['category'],
      order: { id: 'ASC' },
    });
  }
  //endregion

  //region: update(id: number, updateDishDto: UpdateDishDto)
  async update(id: number, updateDishDto: UpdateDishDto, file?: Express.Multer.File): Promise<Dish> {
    console.log("dish.service.ts - update()...");
    console.log("\tdish.service.ts - update() - id: ", id);
    console.log("\tdish.service.ts - update() - updateDishDto: ", updateDishDto);
    console.log("\tdish.service.ts - update() - file.originalname: ", file?.originalname);

    const dish = await this.dishRepository.preload({
      id: id,
      ...updateDishDto,
    });
    console.log("\tdish.service.ts - update() - dish(1): ", dish);

    if (!dish) {
      throw new NotFoundException(`Dish with ID ${id} not found`);
    }
    if (file) {
      dish.categoryImage = file.buffer;
      dish.filename = file.originalname;
      dish.mimetype = file.mimetype;
      console.log("\tdish.service.ts - update() - dish(2): ", dish);
    }

    return await this.dishRepository.save(dish);
  }
  //endregion

  //region: remove(id: number)
  async remove(id: number): Promise<void> {
    const result = await this.dishRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Dish with ID ${id} not found`);
    }
  }
  //endregion
}
//region:
//endregion
