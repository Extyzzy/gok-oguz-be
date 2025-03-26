import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, Res } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ImageGalleryService } from './image-gallery.service';
import { Multer } from 'multer';
import { Response } from 'express';

@Controller('image-gallery')
export class ImageGalleryController {
  constructor(private readonly imageGalleryService: ImageGalleryService) {
    console.log("image-gallery.controller.ts - class ImageGalleryController - constructor()");
  }

  // Post...
  //создать
  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadImage(
    @Body('name') name: string,
    @UploadedFile() imageFile: Multer.File,
  ) {

      console.log("image-gallery.controller.ts - @Post('upload')...");
      console.log("image-gallery.controller.ts - uploadImage...");

/*
    const dto: CreateImageGalleryDto = {
      image: file.buffer,
      imageFileName: file.originalname,
      imageMimeType: file.mimetype,
    };
*/

    return await this.imageGalleryService.create(name, imageFile);
  }
  //---------------------------------------------------------------------------

  // --- Post
  //---------------------------------------------------------------------------

  // Get...
  //получить список названий и id
  @Get('names')
  async getNames() {
    return this.imageGalleryService.getNames();
  }
  //---------------------------------------------------------------------------

  //получить изображение по названию
  @Get('imagebyname/:name')
  async getImageByName(@Param('name') name: string, @Res() res: Response) {

    console.log(`image-gallery.controller.ts - getImageByName() - name: '${name}'`);

    if (!name || name == '')
      return res.status(404).json({ message: `name undefined` });

    const record = await this.imageGalleryService.getRecordByName(name);

    if (!record)
      return res.status(404).json({ message: `records not found (name: '${name}')` });

    res.setHeader('Content-Type', record.imageMimeType);
    res.send(record.image);
  }
  //---------------------------------------------------------------------------

  //получить изображение по id
  @Get('imagebyid/:id')
  async getImageById(@Param('id') id: number, @Res() res: Response) {

    console.log(`image-gallery.controller.ts - getImageById() - id: '${id}'`);

    if (!id)
      return res.status(404).json({ message: `id undefined` });

    const record = await this.imageGalleryService.getRecordById(id);

    if (!record)
      return res.status(404).json({ message: `records not found (id: ${id})` });

    res.setHeader('Content-Type', record.imageMimeType);
    res.send(record.image);
  }
  //---------------------------------------------------------------------------

  //получить все изображения json[id, image: `data:${record.imageMimeType};base64,${record.image.toString('base64')]
  @Get('images')
  async getImages(@Res() res: Response) {

    console.log(`image-gallery.controller.ts - getImages()`);

    const records = await this.imageGalleryService.getRecords();

    if (!records)
      return res.status(404).json({ message: `records not found` });

    res.json(
      records.map((record) => ({
        id: record.id,
        image: `data:${record.imageMimeType};base64,${record.image.toString('base64')}`
      }))
    );
  }
  //---------------------------------------------------------------------------

  // ---Get
  //---------------------------------------------------------------------------

  //---------------------------------------------------------------------------
  // Patch...

  //Изменить всю запись по id
  @Patch('recordbyid/:id')
  @UseInterceptors(FileInterceptor('file'))
  async ptchRecordById(
    @Param('id') id: number,
    @Body('name') name: string,
    @UploadedFile() imageFile: Multer.File
  ) {
    console.log(`image-gallery.controller.ts - ptchRecordById() - id: ${id}.`);

    const updated = await this.imageGalleryService.updateById(
      id,
      name,
      imageFile
    );

    if (!updated) {
      return { message: 'запись не найдена' };
    }

    return { message: `запись обновлена (id: ${id})!`};
  }
  // --- Patch
  //---------------------------------------------------------------------------

  //Изменить всю запись по названию
  @Patch('recordbyname/:name')
  @UseInterceptors(FileInterceptor('file'))
  async ptchRecordByName(
    @Param('name') name: string,
    // @Body('name') name: string,
    @UploadedFile() imageFile: Multer.File
  ) {
    console.log(`image-gallery.controller.ts - ptchRecordByName() - name: ${name}.`);

    const updated = await this.imageGalleryService.updateByName(
      name,
      imageFile
    );

    if (!updated) {
      return { message: 'запись не найдена' };
    }

    return { message: `запись обновлена (name: ${name})!`};
  }
  // --- Patch
  //---------------------------------------------------------------------------

  /*
    @Get()
    findAll() {
      return this.imageGalleryService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string) {
      return this.imageGalleryService.findOne(+id);
    }

    @Patch(':id')
    update(@Param('id') id: string, @Body() updateImageGalleryDto: UpdateImageGalleryDto) {
      return this.imageGalleryService.update(+id, updateImageGalleryDto);
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
      return this.imageGalleryService.remove(+id);
    }
  */

}
