import { Body, Injectable, Param, UploadedFile } from '@nestjs/common';
// import { CreateDishDto } from './dto/create-dish.dto';
import { UpdateDishDto } from './dto/update-dish.dto';
import { Multer } from 'multer';
import { InjectRepository } from '@nestjs/typeorm';
import { Column, Repository } from 'typeorm';
import { Dish } from './entities/dish.entity';
import { DishCategory } from '../dish-category/entities/dish-category.entity';

@Injectable()
export class DishService {

  constructor(
    @InjectRepository(Dish)
    private readonly RepositoryDish: Repository<Dish>,
  ){
    // console.log("dish.service.ts - class DishService - constructor()");
  }
  //---------------------------------------------------------------------------

  // --- create ---
  async create(
    name: string,

    nameRo: string,
    nameRu: string,
    nameEn: string,

    descriptionRo: string,
    descriptionRu: string,
    descriptionEn: string,

    weighDish: number,
    costDish: number,
    categoryDish: string,

    imageFile: Multer.File
  ) {

      console.log("dish.service.ts - create()...");
      console.log(`dish.service.ts - create() - name: ${name}, nameRo: ${nameRo}, nameRu: ${nameRu}, nameEn: ${nameEn}, descriptionRo: ${descriptionRo}, descriptionRu: ${descriptionRu},
        descriptionEn: ${descriptionEn}, weighDish: ${weighDish}, costDish: ${costDish}, categoryDish: ${categoryDish}, imageFile: ${imageFile.originalname}`);


    console.log("dish.service.ts - create() -> RepositoryDish.create()");
    const newRecord = this.RepositoryDish.create({
      name: name,

      nameRo: nameRo,
      nameRu: nameRu,
      nameEn: nameEn,

      descriptionRo: descriptionRo,
      descriptionRu:       descriptionRu,
      descriptionEn: descriptionEn,

      weighDish:       weighDish,
      costDish:      costDish,
      categoryDish:      categoryDish,

      imageDish: imageFile.buffer,
      imageFileName: imageFile.originalname,
      imageMimeType: imageFile.mimetype,
    });

    console.log("dish.service.ts - create() <- RepositoryDish.create()");

    console.log("dish.service.ts - create() -> RepositoryDish.save()");

    const ret = await this.RepositoryDish.save(newRecord);

    console.log("dish.service.ts - create() <- RepositoryDish.save()");

    if (ret != null) {
      console.log("'This action adds a new dish';")
    }
    return ret;
  }
  //----------------------------------------------------------------------------

  //--- Get ---
  async getRecordById(id: number): Promise<Dish | null>{
    return await this.RepositoryDish.findOne({ where: { id } });
  }
  //----------------------------------------------------------------------------

  async getRecordByName(name: string): Promise<Dish | null>{
    return await this.RepositoryDish.findOne({ where: { name/*: name*/ } });
  }
  //----------------------------------------------------------------------------

  async getAllNames()
  {
    // return await this.RepositoryDish.find({ select: ['name'] }) ?? [];
    return await this.RepositoryDish.find({ select: ['name', 'id'] }) ?? [];
  }
  //----------------------------------------------------------------------------

  //Получить все названия одной категории (slag);
  async getNamesByCategory(category: string)
  {
    const records = await this.RepositoryDish.find({
      where: { categoryDish: category }});

      console.log("dish.service.ts - getNamesByCategory() - records: ", records);

    const fields = records.map(record => record.name);

      console.log("dish.service.ts - getNamesByCategory() - fields: ", fields);

    return fields;
  }
  //----------------------------------------------------------------------------

/*
  async getImageById(id: number): Promise<Dish | null> {

    console.log("dish-category.service.ts - getImageById()...");
    console.log("dish-category.service.ts - getImageById() - id: ", id);

    return await this.RepositoryDish.findOne({ where: { id } });
  }
  //---------------------------------------------------------------------------
*/


/*
  findAll() {
    return `This action returns all dish`;
  }

  findOne(id: number) {
    return `This action returns a #${id} dish`;
  }

  update(id: number, updateDishDto: UpdateDishDto) {
    return `This action updates a #${id} dish`;
  }

  remove(id: number) {
    return `This action removes a #${id} dish`;
  }
*/


  //--- patch ---
  async updateById(
    id: number,
    name: string,

    nameRo: string,
    nameRu: string,
    nameEn: string,

    descriptionRo: string,
    descriptionRu: string,
    descriptionEn: string,

    weighDish: number,
    costDish: number,
    categoryDish: string,

    file: Multer.File
  )
  {
    const record = await this.RepositoryDish.findOne({ where: { id } });
    if (!record) {
      console.log("запись не найдена!");
      return null;
    }

    // Обновляем данные
    // category.categoryImage = file.buffer;
    // category.filename = file.originalname;
    // category.mimetype = file.mimetype;
    record.name = name;

    record.nameRo = nameRo;
    record.nameRu = nameRu;
    record.nameEn = nameEn;

    record.descriptionRo = descriptionRo;
    record.descriptionRu = descriptionRu;
    record.descriptionEn = descriptionEn;

    record.weighDish = weighDish;
    record.costDish = costDish;
    record.categoryDish = categoryDish;

    record.imageDish = file.buffer;
    record.imageFileName = file.originalname;
    record.imageMimeType = file.mimetype;

    // Сохраняем изменения
    return await this.RepositoryDish.save(record);
  }
  //---------------------------------------------------------------------------

  async updateByName(
    name: string,

    nameRo: string,
    nameRu: string,
    nameEn: string,

    descriptionRo: string,
    descriptionRu: string,
    descriptionEn: string,

    weighDish: number,
    costDish: number,
    categoryDish: string,

    file: Multer.File
  )
  {
    const record = await this.RepositoryDish.findOne({ where: { name } });
    if (!record) {
      console.log("запись не найдена!");
      return null;
    }

    // Обновляем данные
    // category.categoryImage = file.buffer;
    // category.filename = file.originalname;
    // category.mimetype = file.mimetype;
    // record.name = name;

    record.nameRo = nameRo;
    record.nameRu = nameRu;
    record.nameEn = nameEn;

    record.descriptionRo = descriptionRo;
    record.descriptionRu = descriptionRu;
    record.descriptionEn = descriptionEn;

    record.weighDish = weighDish;
    record.costDish = costDish;
    record.categoryDish = categoryDish;

    record.imageDish = file.buffer;
    record.imageFileName = file.originalname;
    record.imageMimeType = file.mimetype;

    // Сохраняем изменения
    return await this.RepositoryDish.save(record);
  }
  //---------------------------------------------------------------------------

  //--- Delete ---
  async deleteRecordById(id: number): Promise<{ message: string }> {

    console.log("dish-category.service.ts - deleteRecordById() - id:", id);

    const deleteResult = await this.RepositoryDish.delete(id);

    if (deleteResult.affected === 0) {
      return { message: "Запись не найдена" };
    }

    return { message: `Запись с id: ${id}, удалена` };
  }
  //---------------------------------------------------------------------------

  async deleteRecordByName(name: string): Promise<{ message: string }> {

    console.log("dish-category.service.ts - deleteRecordByName() - name:", name);

    const deleteResult = await this.RepositoryDish.delete({ name });

    if (deleteResult.affected === 0) {
      return { message: "Запись не найдена" };
    }

    return { message: `Запись с name: ${name}, удалена` };
  }
  //---------------------------------------------------------------------------


}
