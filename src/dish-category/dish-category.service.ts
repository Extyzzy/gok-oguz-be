import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DishCategory } from '@app/dish-category/entities/dish-category.entity';
import { CreateDishCategoryDto } from '@app/dish-category/dto/create-dish-category.dto';
import { UpdateDishCategoryDto } from '@app/dish-category/dto/update-dish-category.dto';
import { Dish } from '@app/dish/entities/dish.entity';
// import { Multer } from 'multer'; // 🔹 Импортируем Multer

@Injectable()
export class DishCategoryService {

  //----------------------------------------------------------------------
  constructor(
    @InjectRepository(DishCategory)
    private readonly dishCategoryRepository: Repository<DishCategory>,
    @InjectRepository(Dish)
    private readonly dishRepository: Repository<Dish>,
  ) {}

  //----------------------------------------------------------------------
  create(createDishCategoryDto: CreateDishCategoryDto, file: Express.Multer.File) {
      console.log("dish-category.service.ts - create()...");
      console.log("dish-category.service.ts - create() - createDishCategoryDto:", createDishCategoryDto);
      console.log("dish-category.service.ts - create() - file.name:", file.originalname);

    const dishCategory = this.dishCategoryRepository.create(
      createDishCategoryDto,
    );
    console.log("dish-category.service.ts - create() - dishCategory: ", dishCategory);

/*
    const newRecord = this.dishCategoryRepository.create({
      slug: createDishCategoryDto.slug,

      name_ro: createDishCategoryDto.name_ro,
      name_ru: createDishCategoryDto.name_ru,
      name_en: createDishCategoryDto.name_en,

      // categoryImage: file.buffer,
      filename: file.originalname,
      mimetype: file.mimetype
    });
    console.log("dish-category.service.ts - create() - newRecord: ", newRecord);
*/


    // return this.dishCategoryRepository.save(dishCategory);
    // const ret =  this.dishCategoryRepository.save(newRecord);

    // return ret;
    return null;

  }
  //----------------------------------------------------------------------

  //----------------------------------------------------------------------
  async findAll() {
    return await this.dishCategoryRepository.find({
      relations: ['dishes'],
      order: { id: 'ASC' },
    });
  }
  //----------------------------------------------------------------------

  //----------------------------------------------------------------------
  async findDishesBySlug(slug: string) {
    return this.dishRepository.find({
      where: { category: { slug } },
      order: { slug: 'ASC' },
    });
  }
  //----------------------------------------------------------------------

  //----------------------------------------------------------------------
  async findOne(id: number) {
    const dishCategory = await this.dishCategoryRepository.findOne({
      where: { id },
    });

    if (!dishCategory) {
      throw new NotFoundException(`DishCategory with ID ${id} not found`);
    }

    return dishCategory;
  }
  //----------------------------------------------------------------------

  //----------------------------------------------------------------------
  async update(id: number, updateDishCategoryDto: UpdateDishCategoryDto) {
    const dishCategory = await this.dishCategoryRepository.preload({
      id: id,
      ...updateDishCategoryDto,
    });
    if (!dishCategory) {
      throw new NotFoundException(`DishCategory with ID ${id} not found`);
    }
    return await this.dishCategoryRepository.update(id, updateDishCategoryDto);
  }
  //----------------------------------------------------------------------

  //----------------------------------------------------------------------
  async remove(id: number) {
    const result = await this.dishCategoryRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Dish with ID ${id} not found`);
    }
  }
  //----------------------------------------------------------------------

}
