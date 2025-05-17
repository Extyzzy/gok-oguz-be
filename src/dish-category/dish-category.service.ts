
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

  //region: constructor
  //----------------------------------------------------------------------
  constructor(
    @InjectRepository(DishCategory)
    private readonly dishCategoryRepository: Repository<DishCategory>,
    @InjectRepository(Dish)
    private readonly dishRepository: Repository<Dish>,
  ) {}

  //----------------------------------------------------------------------
  //endregion

  //region: create
  //----------------------------------------------------------------------
  create(createDishCategoryDto: CreateDishCategoryDto, file: Express.Multer.File) {
      console.log("dish-category.service.ts - create()...");
      console.log("dish-category.service.ts - create() - createDishCategoryDto:", createDishCategoryDto);
      console.log("dish-category.service.ts - create() - file", file);

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

    dishCategory.categoryImage = file.buffer;
    // dishCategory.categoryImage = Buffer.from('Пример изображения', 'utf-8');
    dishCategory.filename = file.originalname;
    dishCategory.mimetype = file.mimetype;

    console.log("dish-category.service.ts - create() - dishCategory: ", dishCategory);

    const ret = this.dishCategoryRepository.save(dishCategory);
    // return "ok";
    return ret;

  }
  //----------------------------------------------------------------------
  //endregion

  //region: findAll
  //----------------------------------------------------------------------
  async findAll() {
      console.log("dish-category.service.ts - findAll()...");
    return await this.dishCategoryRepository.find({
      relations: ['dishes'],
      order: { id: 'ASC' },
    });
  }
  //----------------------------------------------------------------------
  //endregion

  //region: findDishesBySlug
  //----------------------------------------------------------------------
  async findDishesBySlug(slug: string) {
      console.log("dish-category.service.ts - findDishesBySlug() - slug :", slug);

    return this.dishRepository.find({
      where: { category: { slug } },
      order: { slug: 'ASC' },
    });
  }
  //----------------------------------------------------------------------
  //endregion

  //region: findOne(id: number)
  //----------------------------------------------------------------------
  async findOne(id: number) {
    console.log("dish-category.service.ts - findOne() - id: ", id);

    const dishCategory = await this.dishCategoryRepository.findOne({
      where: { id },
    });
    console.log("dish-category.service.ts - findOne() - dishCategory: ", dishCategory);

    if (!dishCategory) {
      throw new NotFoundException(`DishCategory with ID ${id} not found`);
    }

    return dishCategory;
  }
  //----------------------------------------------------------------------
  //endregion

  //region: update(id: number, updateDishCategoryDto: UpdateDishCategoryDto)
  //----------------------------------------------------------------------
  async update(id: number, updateDishCategoryDto: UpdateDishCategoryDto, file?: Express.Multer.File) {
    console.log("dish-category.service.ts - update()...");
    console.log("\tdish-category.service.ts - update() - id: ", id);
    console.log("\tdish-category.service.ts - update() - updateDishCategoryDto: ", updateDishCategoryDto);

    const dishCategory = await this.dishCategoryRepository.preload({
      id: id,
      ...updateDishCategoryDto,
    });

      console.log("\tdish-category.service.ts - update() - dishCategory: ", dishCategory);
    if (!dishCategory) {
      throw new NotFoundException(`DishCategory with ID ${id} not found`);
    }

    if (file) {
      dishCategory.categoryImage = file.buffer;
      dishCategory.filename = file.originalname;
      dishCategory.mimetype = file.mimetype;
    }

    console.log("\tdish-category.service.ts - update() - dishCategory: ", dishCategory);

    // return await this.dishCategoryRepository.update(id, updateDishCategoryDto);
    return await this.dishCategoryRepository.update(id, dishCategory);
  }
  //----------------------------------------------------------------------
  //endregion

  //region: remove(id: number)
  //----------------------------------------------------------------------
  async remove(id: number) {
    console.log("dish-category.service.ts - remove()...");
      console.log("\tdish-category.service.ts - remove() - id: ", id);

    const result = await this.dishCategoryRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Dish with ID ${id} not found`);
    }
  }
  //----------------------------------------------------------------------
  //endregion
}
//region:
//endregion
