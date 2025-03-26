import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, Res } from '@nestjs/common';
import { DishService } from './dish.service';
import { CreateDishDto } from './dto/create-dish.dto';
import { UpdateDishDto } from './dto/update-dish.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Multer } from 'multer';
import { Response } from 'express';
import { Column } from 'typeorm';

@Controller('dish')
export class DishController {
  constructor(private readonly dishService: DishService) {}

  //--- Post ---
  //создать
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async create(
    @Body('name') name: string,

    @Body('nameRo') nameRo: string,
    @Body('nameRu') nameRu: string,
    @Body('nameEn') nameEn: string,

    @Body('descriptionRo') descriptionRo: string,
    @Body('descriptionRu') descriptionRu: string,
    @Body('descriptionEn') descriptionEn: string,

    @Body('weighDish') weighDish: number,
    @Body('costDish') costDish: number,
    @Body('categoryDish') categoryDish: string,

    @UploadedFile() imageFile: Multer.File,
  ) {

    console.log("dish.controller.ts - create()...");
    console.log("dish.controller.ts - create() - name: ", name);

    console.log("dish.controller.ts - create() -> dishService.create");

    return this.dishService.create(name, nameRo, nameRu, nameEn, descriptionRo, descriptionRu, descriptionEn, weighDish, costDish, categoryDish, imageFile);
  }
  //----------------------------------------------------------------------------

  // Get...
  //получить запись по id
  @Get('recordbyid/:id')
  async getRecordById(@Param('id') id: number, @Res() res: Response) {

      console.log("dish.controller.ts - @Get('recordbyid/:id')...");
      console.log("dish.controller.ts - getRecordById() - id: ", id);

      const record = await this.dishService.getRecordById(id);
    if (!record) {
      return res.status(404).json({ message: `record (id: ${id}) not found` });
    }
    console.log("dish.controller.ts - getRecordById() - record: ", record);

    res.send(record);
  }
  //----------------------------------------------------------------------------

  //получить запись по названию
  @Get('recordbyname/:name')
  async getRecordByName(@Param('name') name: string, @Res() res: Response) {

    console.log("dish.controller.ts - @Get('recordbyname/:name')...");
    console.log("dish.controller.ts - getRecordByName() - name: ", name);

    const record = await this.dishService.getRecordByName(name);
    if (!record) {
      return res.status(404).json({ message: `record (name: ${name}) not found` });
    }
    console.log("dish.controller.ts - getRecordById() - record: ", record);

    res.send(record);
  }
  //----------------------------------------------------------------------------

  //Получить все названия
  @Get('allnames')
  async getAllNames(@Param('name') name: string, @Res() res: Response) {

    console.log("dish.controller.ts - @Get('allnames')...");
    console.log("dish.controller.ts - getAllNames()...");

    const record = await this.dishService.getAllNames();
    if (!record) {
      return res.status(404).json({ message: `records not found` });
    }
    console.log("dish.controller.ts - geAllNames() - record: ", record);

    res.send(record);
  }
  //----------------------------------------------------------------------------

  //Получить все названия одной категории (slag);
  @Get('namesbycategory/:category')
  async getNamesByCategory(@Param('category') category: string, @Res() res: Response) {

    console.log("dish.controller.ts - @Get('namesbycategory/:category')...");
    console.log("dish.controller.ts - getNamesByCategory()...");

    const record = await this.dishService.getNamesByCategory(category);
    if (!record) {
      return res.status(404).json({ message: `records not found` });
    }
    console.log("dish.controller.ts - getNamesByCategory() - record: ", record);

    res.send(record);
  }
  //----------------------------------------------------------------------------

  //Получить все для одного языка по названию
  @Get('databynameandlang/:name/:lang')
  async getDataByNameAndLang(@Param('name') name: string, @Param('lang') lang: string, @Res() res: Response) {

    console.log("dish.controller.ts - @Get('databynameandlang/:name/:lang')...");
    console.log(`dish.controller.ts - getDataByNameAndLang() - name: ${name}, lang: ${lang}`);

    const record = await this.dishService.getRecordByName(name);
    if (!record) {
      return res.status(404).json({ message: `records not found` });
    }
    console.log("dish.controller.ts - getNamesByCategory() - record: ", record);

    const fld = {
      name: record.name,
      nameLang: lang == 'ro' ? record.nameRo : (lang == 'ru' ? record.nameRu:record.nameEn),
      descriptionLang: lang == 'ro' ? record.descriptionRo : (lang == 'ru' ? record.descriptionRu : record.descriptionEn),
      weighDish: record.weighDish,
      costDish: record.costDish,
      categoryDish: record.categoryDish,
      imageDish: record.imageDish,
      imageFileName: record.imageFileName,
      imageMimeType: record.imageMimeType
    }

    res.send(fld);
  }
  //----------------------------------------------------------------------------

  //Получить изображение по id
  @Get('imagebyid/:id')
  async getImageById(@Param('id') id: number, @Res() res: Response) {

    console.log("dish.controller.ts - @Get('imageById/:id')...");
    console.log(`dish.controller.ts - getImageById() - id: ${id}`);

    const record = await this.dishService.getRecordById(id);
    if (!record) {
      return res.status(404).json({ message: `records not found` });
    }
    console.log("dish.controller.ts - getNamesByCategory() - record: ", record);

    res.setHeader('Content-Type', record.imageMimeType);
    res.send(record.imageDish);
  }
  //----------------------------------------------------------------------------

  //Получить изображение по названию
  @Get('imagebyname/:name')
  async getImageByName(@Param('name') name: string, @Res() res: Response) {

    console.log("dish.controller.ts - @Get('imagebyname/:name')...");
    console.log(`dish.controller.ts - getImageByName() - name: ${name}`);

    const record = await this.dishService.getRecordByName(name);
    if (!record) {
      return res.status(404).json({ message: `records not found` });
    }
    console.log("dish.controller.ts - getNamesByCategory() - record: ", record);

    res.setHeader('Content-Type', record.imageMimeType);
    res.send(record.imageDish);
  }
  //----------------------------------------------------------------------------



/*
  @Get()
  findAll() {
    return this.dishService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.dishService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDishDto: UpdateDishDto) {
    return this.dishService.update(+id, updateDishDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.dishService.remove(+id);
  }
*/

  //---------------------------------------------------------------------------
  // Patch...
  //Изменить всю запись по id
  @Patch('recordbyid/:id')
  @UseInterceptors(FileInterceptor('file'))
  async updateRecordById(
    @Param('id') id: number,
    @Body('name') name: string,

    @Body('nameRo') nameRo: string,
    @Body('nameRu') nameRu: string,
    @Body('nameEn') nameEn: string,

    @Body('descriptionRo') descriptionRo: string,
    @Body('descriptionRu') descriptionRu: string,
    @Body('descriptionEn') descriptionEn: string,

    @Body('weighDish') weighDish: number,
    @Body('costDish') costDish: number,
    @Body('categoryDish') categoryDish: string,

    @UploadedFile() file: Multer.File
  ) {

    console.log("dish.controller.ts - @Patch('recordbyid/:id')...");
    console.log(`dish.controller.ts - updateRecordById() - id: ${id}`);

    const updated = await this.dishService.updateById(
      id,
      name,

      nameRo,
      nameRu,
      nameEn,

      descriptionRo,
      descriptionRu,
      descriptionEn,

      weighDish,
      costDish,
      categoryDish,

      file
      );
    if (!updated) {
      return { message: 'запись не найдена' };
    }
    return { message: 'запись обновлена!', id: updated.id };
  }
  //----------------------------------------------------------------------------

  //Изменить всю запись по id
  @Patch('recordbyname/:name')
  @UseInterceptors(FileInterceptor('file'))
  async updateRecordByName(
    @Param('name') name: string,
    // @Body('name') name: string,

    @Body('nameRo') nameRo: string,
    @Body('nameRu') nameRu: string,
    @Body('nameEn') nameEn: string,

    @Body('descriptionRo') descriptionRo: string,
    @Body('descriptionRu') descriptionRu: string,
    @Body('descriptionEn') descriptionEn: string,

    @Body('weighDish') weighDish: number,
    @Body('costDish') costDish: number,
    @Body('categoryDish') categoryDish: string,

    @UploadedFile() file: Multer.File
  ) {

    console.log("dish.controller.ts - @Patch('recordbyname/:name')...");
    console.log(`dish.controller.ts - updateRecordByName() - name: ${name}`);

    const updated = await this.dishService.updateByName(
      name,

      nameRo,
      nameRu,
      nameEn,

      descriptionRo,
      descriptionRu,
      descriptionEn,

      weighDish,
      costDish,
      categoryDish,

      file
    );

    if (!updated) {
      return { message: 'запись не найдена' };
    }

    return { message: 'запись обновлена!', id: updated.id };
  }
  //----------------------------------------------------------------------------

  //--- Delete ---
  //удалить запись по id
  @Delete('recordbyid/:id')
  async deleteRecordById(@Param('id') id: number) {

    console.log("dish.controller.ts - @Delete('recordbyid/:id')...");
    console.log(`dish.controller.ts - deleteRecordById() - id: ${id}`);

    return await this.dishService.deleteRecordById(id);
  }
  //---------------------------------------------------------------------------

  //удалить запись по названию
  @Delete('recordbyname/:name')
  async deleteRecordByName(@Param('name') name: string) {

    console.log("dish.controller.ts - @Delete('recordbyname/:name')...");
    console.log(`dish.controller.ts - deleteRecordByName() - name: ${name}`);

    return await this.dishService.deleteRecordByName(name);
  }
  //---------------------------------------------------------------------------
}
