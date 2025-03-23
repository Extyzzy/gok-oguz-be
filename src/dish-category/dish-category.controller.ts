import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DishCategoryService } from './dish-category.service';
import { CreateDishCategoryDto } from './dto/create-dish-category.dto';
import { UpdateDishCategoryDto } from './dto/update-dish-category.dto';

import { UseInterceptors, UploadedFile, Res } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
// import { DishCategoryService } from './dish-category.service';
// import { Response } from 'express';
import { Multer } from 'multer'; // 🔹 Импортируем Multer


@Controller('dish-category')
export class DishCategoryController {
  constructor(private readonly dishCategoryService: DishCategoryService) {
    console.log("dish-category.controller.ts - class DishCategoryController - constructor()");
  }

/*
  @Post()
  create(@Body() createDishCategoryDto: CreateDishCategoryDto) {
    return this.dishCategoryService.create(createDishCategoryDto);
  }
*/

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
  findOne(@Param('id') id: string) {
    return this.dishCategoryService.findOne(+id);
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
