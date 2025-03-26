import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DishService } from './dish.service';
import { DishController } from './dish.controller';
import { Dish } from './entities/dish.entity';

import { Body, UploadedFile } from '@nestjs/common';
import path from 'path';
import fs from 'fs';
import { Multer } from 'multer';

describe('dish.controller.ts', () => {
  // let service: DishService;
  let controller: DishController;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        TypeOrmModule.forRoot({
          type: 'postgres',
          host: 'localhost',
          port: 5432,
          username: 'postgres',
          password: '',
          database: 'postgres',
          entities: [__dirname + '/**/*.entity{.ts,.js}'],
          synchronize: true,
        }),
        TypeOrmModule.forFeature([Dish]),
      ],
      providers: [DishService],
      controllers: [DishController],
    }).compile();

    // service = module.get<DishService>(DishService);
    controller = module.get<DishController>(DishController);
  });


  test('create', async ()=>{

      console.log("test - 'create'...");

    const filePath = path.join(__dirname, '../../Docs/Image/париж.jpg');
    const fileBuffer = fs.readFileSync(filePath);



    // Создаём объект, имитирующий файл Multer
    const mockFile = {
      buffer: fileBuffer,
      originalname: 'test.jpg',
      mimetype: 'image/jpeg',
    } as Multer.File;

    const name: string = "nameDish_1";

    const nameRo: string = "nameDish_Ro_1";
    const nameRu: string = "nameDish_Ru_1";
    const nameEn: string = "nameDish_En_1";

    const descriptionRo: string = "description_Ro_1";
    const descriptionRu: string = "description_Ru_1";
    const descriptionEn: string = "description_En_1";

    const weighDish: number = 100;
    const costDish: number = 38500;
    const categoryDish: string = "Category_1";

    const imageFile: Multer.File = mockFile;

    console.log("test -> controller.create()");


    // создать запись
    const createdrRecord = await controller.create(
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

  imageFile
    );

    console.log("test <- controller.create()");


    expect(createdrRecord).toBeDefined();

  })
})