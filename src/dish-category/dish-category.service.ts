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
  //---------------------------------------------------------------------------

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
  //---------------------------------------------------------------------------

  findAll() {
    return `This action returns all dishCategory`;
  }
  //---------------------------------------------------------------------------

  findOne(id: number) {
    console.log("dish-category.service.ts - findOne()...");
    console.log("dish-category.service.ts - findOne() - id: ", id);

    return `This action returns a #${id} dishCategory`;
  }
  //---------------------------------------------------------------------------

  async getImageById(id: number): Promise<DishCategory | null> {

    console.log("dish-category.service.ts - getImageById()...");
    console.log("dish-category.service.ts - getImageById() - id: ", id);

    return await this.RepositoryDishCategory.findOne({ where: { id } });
  }
  //---------------------------------------------------------------------------

  async oneRecord(name: string): Promise<DishCategory | null> {

    console.log("dish-category.service.ts - oneRecord()...");
    console.log("dish-category.service.ts - oneRecord() - name: ", name);

    const oneRecord = await this.RepositoryDishCategory.findOne({ where: { categoryName: name } });

    if (oneRecord) {
      console.log("oneRecord() - ID:", oneRecord.id);
      console.log("oneRecord() - Название:", oneRecord.categoryName);
      console.log("oneRecord() - Файл:", oneRecord.filename);
    } else {
      console.log("oneRecord() - Категория не найдена");
    }

    // return await this.RepositoryDishCategory.findOne({ where:  {categoryName: name} });
    return oneRecord;

  }
  //---------------------------------------------------------------------------

  async getAllCategoryNames() :Promise<string[] | null> {

    console.log("dish-category.service.ts - getAllNames()...");

    const categories: Pick<DishCategory, 'categoryName'>[] =
        await this.RepositoryDishCategory.find({ select: ['categoryName'] }) ?? [];

    console.log("categories: ", categories);

    /*    debug
        let names = categories.map((category) => category.categoryName);
        console.log("names: ", names);
    */

    return categories.map((category) => category.categoryName);
  }
  //---------------------------------------------------------------------------

  /*
    update(id: number, updateDishCategoryDto: UpdateDishCategoryDto) {
      return `This action updates a #${id} dishCategory`;
    }
  */

  async updateImage(id: number, file: Multer.File): Promise<DishCategory | null> {
    console.log("dish-category.service.ts - updateImage()...");
    console.log("dish-category.service.ts - updateImage() - id:", id);

    // Находим запись по ID
    const category = await this.RepositoryDishCategory.findOne({ where: { id } });
    if (!category) {
      console.log("Категория не найдена!");
      return null;
    }

    // Обновляем данные
    category.categoryImage = file.buffer;
    category.filename = file.originalname;
    category.mimetype = file.mimetype;

    // Сохраняем изменения
    return await this.RepositoryDishCategory.save(category);
  }
  //---------------------------------------------------------------------------

  async update(
                id: number,
                file: Multer.File,
                categoryName: string,

                ro: string,
                ru: string,
                en: string): Promise<DishCategory | null> {

    console.log("dish-category.service.ts - update()...");
    console.log("dish-category.service.ts - update() - id:", id);
    console.log("dish-category.service.ts - update() - id, categoryName, ro, ru, en: ", id, categoryName, ro, ru, en);

    // Находим запись по ID
    const category = await this.RepositoryDishCategory.findOne({ where: { id } });
    if (!category) {
      console.log("Категория не найдена!");
      return null;
    }

    // Обновляем данные
    category.categoryImage = file.buffer;
    category.filename = file.originalname;
    category.mimetype = file.mimetype;

    category.categoryName = categoryName;
    category.ro = ro;
    category.ru = ru;
    category.en = en;

    // Сохраняем изменения
    return await this.RepositoryDishCategory.save(category);
  }
  //---------------------------------------------------------------------------

  async patchLangsById(
    id: number,

    ro: string,
    ru: string,
    en: string): Promise<DishCategory | null> {

    console.log("dish-category.service.ts - patchLangsById()...");
    // console.log("dish-category.service.ts - patchLangsById() - id:", id);
    console.log("dish-category.service.ts - patchLangsById() - id, ro, ru, en: ", id, ro, ru, en);

    // Находим запись по ID
    const category = await this.RepositoryDishCategory.findOne({ where: { id } });
    if (!category) {
      console.log("Категория не найдена!");
      return null;
    }

    // Обновляем данные
    // category.categoryImage = file.buffer;
    // category.filename = file.originalname;
    // category.mimetype = file.mimetype;

    // category.categoryName = categoryName;
    category.ro = ro;
    category.ru = ru;
    category.en = en;

    // Сохраняем изменения
    return await this.RepositoryDishCategory.save(category);
  }
  //---------------------------------------------------------------------------


  remove(id: number) {
    return `This action removes a #${id} dishCategory`;
  }

  async deleteRecordByName(name: string): Promise<{ message: string }> {
    console.log("dish-category.service.ts - deleteRecordByName() - name:", name);

    const deleteResult = await this.RepositoryDishCategory.delete({ categoryName: name });

    if (deleteResult.affected === 0) {
      return { message: "Запись не найдена" };
    }

    return { message: `Запись с name ${name} удалена` };
  }

  async deleteRecordById(id: number): Promise<{ message: string }> {
    console.log("dish-category.service.ts - deleteRecordBy() - id:", id);

    const deleteResult = await this.RepositoryDishCategory.delete(id);

    if (deleteResult.affected === 0) {
      return { message: "Запись не найдена" };
    }

    return { message: `Запись с id ${id} удалена` };
  }

}
