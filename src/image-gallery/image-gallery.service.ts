import { Body, Delete, Injectable, Param, UploadedFile } from '@nestjs/common';
/*
import { CreateImageGalleryDto } from './dto/create-image-gallery.dto';
import { UpdateImageGalleryDto } from './dto/update-image-gallery.dto';
*/
import { InjectRepository } from '@nestjs/typeorm';
import { Multer } from 'multer';
import { Column, Repository } from 'typeorm';
import { ImageGallery } from './entities/image-gallery.entity';

@Injectable()
export class ImageGalleryService {

  constructor(
    @InjectRepository(ImageGallery)
    private readonly imageGalleryRepository: Repository<ImageGallery>,
  ){
    console.log("image-gallery.service.ts - class ImageGalleryService - constructor()");
  }
  //---------------------------------------------------------------------------

  async create(name: string, imageFile: Multer.File): Promise<ImageGallery> {

    const newRecord = this.imageGalleryRepository.create({
      name: name,
      image: imageFile.buffer,
      imageFileName: imageFile.originalname,
      imageMimeType: imageFile.mimetype
    });

    return await this.imageGalleryRepository.save(newRecord);
  }
  //---------------------------------------------------------------------------

  //---------------------------------------------------------------------------
  // Get...
  async getNames()
  {
    return await this.imageGalleryRepository.find({ select : ['name', 'id'] });
  }
  //---------------------------------------------------------------------------

  async getRecordByName(name)
  {
    return await this.imageGalleryRepository.findOne({ where: {name} });
  }
  //---------------------------------------------------------------------------

  async getRecordById(id)
  {
    return await this.imageGalleryRepository.findOne({ where: {id} });
  }
  //---------------------------------------------------------------------------

  async getRecords()
  {
    return await this.imageGalleryRepository.find();
  }
  //---------------------------------------------------------------------------

  // --- Get
  //---------------------------------------------------------------------------


  //---------------------------------------------------------------------------
  // Patch...

  async updateById(
    id: number,
    name: string,
    imageFile: Multer.File
  ){

    console.log(`image-gallery.service.ts - updateById() - id: ${id}.`);

    const record = await this.imageGalleryRepository.findOne({where: {id}} );

    if (!record) {
      console.log("запись не найдена!");
      return null;
    }

    // console.log(`image-gallery.service.ts - updateById() - record: ${record}.`);

    record.name = name;
    record.image = imageFile.buffer;
    record.imageFileName = imageFile.originalname;
    record.imageMimeType = imageFile.mimeType;

    return await this.imageGalleryRepository.save(record);
  }
  //---------------------------------------------------------------------------

  async updateByName(
    // id: number,
    name: string,
    newName: string,
    imageFile: Multer.File
  ){

    console.log(`image-gallery.service.ts - updateByName() - name: ${name}.`);

    const record = await this.imageGalleryRepository.findOne({where: {name}} );

    if (!record) {
      console.log("запись не найдена!");
      return null;
    }

    // console.log(`image-gallery.service.ts - updateById() - record: ${record}.`);

    record.name = newName;
    record.image = imageFile.buffer;
    record.imageFileName = imageFile.originalname;
    record.imageMimeType = imageFile.mimeType;

    return await this.imageGalleryRepository.save(record);
  }
  //---------------------------------------------------------------------------

  // --- Patch
  //---------------------------------------------------------------------------

  // Delete...
  //удалить запись по id
  @Delete('recordbyid/:id')
  async deleteRecordById(@Param('id') id: number) {

    console.log("image-gallery.service.ts - @Delete('recordbyid/:id')...");
    console.log(`image-gallery.service.ts - deleteRecordById() - id: ${id}`);

    return await this.imageGalleryRepository.delete(id);
  }
  //---------------------------------------------------------------------------

  //удалить запись по названию
  @Delete('recordbyname/:name')
  async deleteRecordByName(@Param('name') name: string) {

    console.log("image-gallery.service.ts - @Delete('recordbyname/:name')...");
    console.log(`image-gallery.service.ts - deleteRecordByName() - name: ${name}`);

    return await this.imageGalleryRepository.delete(name);
  }
  //---------------------------------------------------------------------------

  // --- Delete
  //---------------------------------------------------------------------------

}
