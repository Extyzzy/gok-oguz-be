import { Controller, Get, Post, Body, Patch, Param, Delete, Res} from '@nestjs/common';
import { DishCategoryService } from './dish-category.service';
import { CreateDishCategoryDto } from './dto/create-dish-category.dto';
import { UpdateDishCategoryDto } from './dto/update-dish-category.dto';

import { UseInterceptors, UploadedFile/*, Res */} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import { Multer } from 'multer'; // 🔹 Импортируем Multer


@Controller('dish-category')
export class DishCategoryController {
  constructor(private readonly dishCategoryService: DishCategoryService) {
    console.log("dish-category.controller.ts - class DishCategoryController - constructor()");
  }

  //--- Post ---
  //создать
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Multer.File,
                   @Body('categoryName') categoryName: string,

                   @Body('ro') ro: string,
                   @Body('ru') ru: string,
                   @Body('en') en: string) {

    console.log("dish-category.controller.ts - uploadFile()...");
    console.log("dish-category.controller.ts - uploadFile() - categoryName, ro, ru, en: ", categoryName, ro, ru, en);

    const image = await this.dishCategoryService.uploadImage(file, categoryName, ro, ru, en);
    return { id: image.id, filename: image.filename };
  }

  //--- Get ---

/*
  @Get()
  findAll() {
    return this.dishCategoryService.findAll();
  }
  //----------------------------
*/

  //получить все по id
  @Get('allbyid/:id')
  async getAllById(@Param('id') id: number, @Res() res: Response) {

    console.log("dish-category.controller.ts - @Get('allbyid/:id')...");
    console.log("dish-category.controller.ts - allById() - id: ", id);

    const image = await this.dishCategoryService.getImageById(id);
    if (!image) {
      return res.status(404).json({ message: 'Image not found' });
    }
    // res.setHeader('Content-Type', image.mimetype);
    res.send({image: image.categoryImage, name: image.categoryName, ro: image.ro, ru: image.ru, en: image.en}); //, ro: image.ro, image.ru, image.en);
    // res.send(image);
  }
  //---------------------------------------------------------------------------

  //получить изображение по id
  @Get('imagebyid/:id')
  async getImageById(@Param('id') id: number, @Res() res: Response) {

      console.log("dish-category.controller.ts -@Get('imagebyid/:id')...");
      console.log("dish-category.controller.ts - getImageById - id: ", id);

    const image = await this.dishCategoryService.getImageById(id);
    if (!image) {
      return res.status(404).json({ message: 'Image not found' });
    }
    res.setHeader('Content-Type', image.mimetype);
    // res.send({aa:image.categoryImage, d:image.categoryName});
    res.send(image.categoryImage);
    // res.send(image);
  }
  //----------------------------

  //получить изображение и название по id
  @Get('imageandnamebyid/:id') // @Get('imname/:id')??????
  async getImageAndNameById(@Param('id') id: number, @Res() res: Response) {

    console.log("dish-category.controller.ts - @Get('imageandnamebyid/:id')...");
    console.log("dish-category.controller.ts - imageandnamebyid - id: ", id);

    const image = await this.dishCategoryService.getImageById(id);
    if (!image) {
      return res.status(404).json({ message: 'Image not found' });
    }
    res.setHeader('Content-Type', image.mimetype);
    res.send({image: image.categoryImage, name :image.categoryName});
    // res.send(image);
  }
  //---------------------------------------------------------------------------

  //получить название по id
  @Get('namebyid/:id')
  async getNameById(@Param('id') id: number, @Res() res: Response) {

    console.log("dish-category.controller.ts - @Get('namefromid/:id')...");
    console.log("dish-category.controller.ts - nameFromId() - id: ", id);

    const image = await this.dishCategoryService.getImageById(id);
    if (!image) {
      return res.status(404).json({ message: 'Image not found' });
    }
    res.setHeader('Content-Type', image.mimetype);
    res.send(image.categoryName);
    // res.send(image);
  }
  //---------------------------------------------------------------------------

  //получить языки по названию
  @Get('langsbyname/nameis/:name')
  async getLangsByName(@Param('name') name: string, /*@Param('lang') lang: string, */@Res() res: Response) {

    console.log("dish-category.controller.ts - @Get('langfromname/nameis/:name')...");
    console.log("dish-category.controller.ts - getFile4() - name: ", name/*, lang*/);

    const image = await this.dishCategoryService.oneRecord(name);
    if (!image) {
      return res.status(404).json({ message: 'Image not found' });
    }

    console.log("dish-category.controller.ts - getFile4() - image: ", image);

    // res.setHeader('Content-Type', image.mimetype);

    const ret = {
      ro: image.ro,
      ru: image.ru,
      en: image.en
    }
    console.log("dish-category.controller.ts - getFile4() - ret: ", ret);

/*
    if (lang === 'ru')
      res.send(image.ru);
    else if (lang === 'ro')
      res.send(image.ro);
    else if (lang === 'en')
      res.send(image.en);
    else
      res.send("");
*/

    // res.send(image.categoryName);
    // res.send(image);
    res.send(ret)
    // return ret;
  }
  //---------------------------------------------------------------------------

  //получить язык по названию и языку
  @Get('langbynameandlang/:nameis/:langis')
  async getLangByNameAndLang(@Param('nameis') name: string, @Param('langis') lang: string, /*@Param('lang') lang: string, */@Res() res: Response) {

    console.log("dish-category.controller.ts - @Get('langfromname/:nameis/:langis')...");
    console.log("dish-category.controller.ts - getLangFromName() - name, lang: ", name, lang);

    const image = await this.dishCategoryService.oneRecord(name);
    if (!image) {
      return res.status(404).json({ message: 'Image not found' });
    }

    console.log("dish-category.controller.ts - getLangFromName() - image: ", image);

    // res.setHeader('Content-Type', image.mimetype);

    let ret = '';

    switch(lang) {
      case 'ro': {
        ret = image.ro;
        break;
      }
      case 'ru': {
        ret = image.ru;
        break;
      }
      case 'en': {
        ret = image.en
        break;
      }
    }


      console.log("dish-category.controller.ts - getLangFromName() - ret: ", ret);

    /*
        if (lang === 'ru')
          res.send(image.ru);
        else if (lang === 'ro')
          res.send(image.ro);
        else if (lang === 'en')
          res.send(image.en);
        else
          res.send("");
    */

    // res.send(image.categoryName);
    // res.send(image);
    res.send(ret);
    // return ret;
  }
  //---------------------------------------------------------------------------

  //Получить все названия
  @Get('allNames')
  async getAllNames(@Res() res: Response){
    console.log("dish-category.controller.ts - @Get('allCategoryNames')...");
    console.log("dish-category.controller.ts - getAllCategoryNames()...");

    const categoryNames = await this.dishCategoryService.getAllCategoryNames();

/*
    if (!image) {
      return res.status(404).json({ message: 'Image not found' });
    }
*/

    console.log("categoryNames: ", categoryNames);

    res.send(categoryNames);

  }
  //---------------------------------------------------------------------------

  //Получить изображение по названию
  @Get('imagebyname/:name')
  async getImageByName(@Param('name') name: string, @Res() res: Response)
  {
    console.log("dish-category.controller.ts - @Get('imagebyname/:name')...");
    console.log("dish-category.controller.ts - getImageByName() - name: ", name);

    const oneRecord = await this.dishCategoryService.oneRecord(name);
    if (!oneRecord) {
      return res.status(404).json({ message: 'Image not found' });
    }
    console.log("dish-category.controller.ts - getImageFromName() - oneRecord.categoryName: ", oneRecord.categoryName);
    console.log("dish-category.controller.ts - getImageFromName() - oneRecord.categoryImage: ", oneRecord.categoryImage);

    res.setHeader('Content-Type', oneRecord.mimetype);
    // res.send({aa:oneRecord.categoryImage, d:oneRecord.categoryName});
    res.send(oneRecord.categoryImage);
  }
  //---------------------------------------------------------------------------

  //--- Patch ---
  /*
    @Patch(':id')
    update(@Param('id') id: string, @Body() updateDishCategoryDto: UpdateDishCategoryDto) {
      return this.dishCategoryService.update(+id, updateDishCategoryDto);
    }
  */

  //изменить изображение по id
  @Patch('imagebyid/:id')
  @UseInterceptors(FileInterceptor('file'))
  async updateImage(
    @Param('id') id: number,
    @UploadedFile() file: Multer.File
  ) {
    const updatedCategory = await this.dishCategoryService.updateImage(id, file);
    if (!updatedCategory) {
      return { message: 'Категория не найдена' };
    }
    return { message: 'Изображение обновлено', id: updatedCategory.id };
  }
  //----------------------------

  //изменить все по id
  @Patch('allbyid/:id')
  @UseInterceptors(FileInterceptor('file'))
  async update(
    @Param('id') id: number,
    @UploadedFile() file: Multer.File,
    @Body('categoryName') categoryName: string,

    @Body('ro') ro: string,
    @Body('ru') ru: string,
    @Body('en') en: string
  ) {

    console.log("dish-category.controller.ts - update() - id, categoryName, ro, ru, en: ", id, categoryName, ro, ru, en);

    const updatedCategory = await this.dishCategoryService.update(id, file, categoryName, ro, ru, en);
    if (!updatedCategory) {
      return { message: 'Категория не найдена' };
    }
    return { message: 'Изображение обновлено', id: updatedCategory.id };
  }
  //----------------------------

  //изменить названия категорий для всех языков по id
  @Patch('langsbyid/:id')
  @UseInterceptors(FileInterceptor('file'))
  async patchLangsById(
    @Param('id') id: number,
    // @UploadedFile() file: Multer.File,
    // @Body('categoryName') categoryName: string,

    @Body('ro') ro: string,
    @Body('ru') ru: string,
    @Body('en') en: string
  ) {

    console.log("dish-category.controller.ts - patchLangsById() - id, ro, ru, en: ", id, ro, ru, en);

    const updatedCategory = await this.dishCategoryService.patchLangsById(id, ro, ru, en);
    if (!updatedCategory) {
      return { message: 'Категория не найдена' };
    }
    return { message: 'описания обновлены', id: updatedCategory.id };
  }
  //----------------------------

  //--- Delete ---
  //удалить запись по названию
  @Delete('deletebyname/:name')
  async deleteRecordByName(@Param('name') name: string) {
    return await this.dishCategoryService.deleteRecordByName(name);
  }
  //----------------------------

  //удалить запись по id
  @Delete('deletebyid/:id')
  async deleteRecordById(@Param('id') id: number) {
    return await this.dishCategoryService.deleteRecordById(id);
  }

}
