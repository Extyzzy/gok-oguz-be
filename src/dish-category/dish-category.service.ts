import { Body, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateDishCategoryDto } from './dto/create-dish-category.dto';
import { UpdateDishCategoryDto } from './dto/update-dish-category.dto';
import { Repository } from 'typeorm';
import { DishCategory } from './entities/dish-category.entity';
import { Multer } from 'multer'; // 🔹 Импортируем Multer


@Injectable()
export class DishCategoryService {

/*
  create(createDishCategoryDto: CreateDishCategoryDto) {
    return 'This action adds a new dishCategory';
  }
*/
  constructor(
    @InjectRepository(DishCategory)
    private readonly RepositoryDishCategory: Repository<DishCategory>,
  ){
    console.log("dish-category.service.ts - class DishCategoryService - constructor()");
  }

  async uploadImage(file: Multer.File,
                    categoryName: string,

                    ro: string,
                    ru: string,
                    en: string): Promise<DishCategory> {

    console.log("dish-category.service.ts - uploadImage()...");
    console.log("dish-category.service.ts - uploadImage() - categoryName, ro, ru, en: ", categoryName, ro, ru, en);

    const newRecord = this.RepositoryDishCategory.create({
      categoryName: categoryName,
      categoryImage: file.buffer,
      filename: file.originalname,
      mimetype: file.mimetype,
      ro: ro,
      ru: ru,
      en: en
    });
    return await this.RepositoryDishCategory.save(newRecord);
  }


  findAll() {
    return `This action returns all dishCategory`;
  }

  findOne(id: number) {
    console.log("dish-category.service.ts - findOne()...");
    console.log("dish-category.service.ts - findOne() - id: ", id);

    return `This action returns a #${id} dishCategory`;
  }


  async getImage(id: number): Promise<DishCategory | null> {

    console.log("dish-category.service.ts - getImage()...");
    console.log("dish-category.service.ts - getImage() - id: ", id);

    return await this.RepositoryDishCategory.findOne({ where: { id } });
  }

  update(id: number, updateDishCategoryDto: UpdateDishCategoryDto) {
    return `This action updates a #${id} dishCategory`;
  }

  remove(id: number) {
    return `This action removes a #${id} dishCategory`;
  }
}
