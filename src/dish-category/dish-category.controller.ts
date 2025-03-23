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

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Multer.File,
                   @Body('categoryName') categoryName: string,

                   @Body('ro') ro: string,
                   @Body('ru') ru: string,
                   @Body('en') en: string,) {

      console.log("dish-category.controller.ts - uploadFile()...");

    console.log("dish-category.controller.ts - uploadFile() - categoryName, ro, ru, en: ", categoryName, ro, ru, en);
    const image = await this.dishCategoryService.uploadImage(file, categoryName, ro, ru, en);
    return { id: image.id, filename: image.filename };
  }


  @Get()
  findAll() {
    return this.dishCategoryService.findAll();
  }

  @Get(':id')
  async getFile(@Param('id') id: number, @Res() res: Response) {

      console.log("dish-category.controller.ts - getFile()...");
      console.log("dish-category.controller.ts - getFile() - id: ", id);

    const image = await this.dishCategoryService.getImage(id);
    if (!image) {
      return res.status(404).json({ message: 'Image not found' });
    }
    res.setHeader('Content-Type', image.mimetype);
    // res.send({aa:image.categoryImage, d:image.categoryName});
    res.send(image.categoryImage);
    // res.send(image);
  }

  @Get('imname/:id')
  async getFile2(@Param('id') id: number, @Res() res: Response) {

    console.log("dish-category.controller.ts - getFile2()...");
    console.log("dish-category.controller.ts - getFile2() - id: ", id);

    const image = await this.dishCategoryService.getImage(id);
    if (!image) {
      return res.status(404).json({ message: 'Image not found' });
    }
    res.setHeader('Content-Type', image.mimetype);
    res.send({image:image.categoryImage, name:image.categoryName});
    // res.send(image);
  }

  @Get('name/:id')
  async getFile3(@Param('id') id: number, @Res() res: Response) {

    console.log("dish-category.controller.ts - getFile3()...");
    console.log("dish-category.controller.ts - getFile3() - id: ", id);

    const image = await this.dishCategoryService.getImage(id);
    if (!image) {
      return res.status(404).json({ message: 'Image not found' });
    }
    res.setHeader('Content-Type', image.mimetype);
    res.send(image.categoryName);
    // res.send(image);
  }


  @Get(':name/:lang')
  async getFile4(@Param('name') name: string, @Param('lang') lang: string, @Res() res: Response) {

    console.log("dish-category.controller.ts - getFile4()...");
    console.log("dish-category.controller.ts - getFile4() - name, lang: ", name, lang);

    const image = await this.dishCategoryService.getImage2(name);
    if (!image) {
      return res.status(404).json({ message: 'Image not found' });
    }


    console.log("dish-category.controller.ts - getFile4() - image: ", image);


    res.setHeader('Content-Type', image.mimetype);

    if (lang === 'ru')
      res.send(image.ru);
     else if (lang === 'ro')
      res.send(image.ro);
     else if (lang === 'en')
      res.send(image.en);
     else
      res.send("");

    // res.send(image.categoryName);
    // res.send(image);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDishCategoryDto: UpdateDishCategoryDto) {
    return this.dishCategoryService.update(+id, updateDishCategoryDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.dishCategoryService.remove(+id);
  }
}
