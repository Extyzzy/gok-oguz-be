import { Test, TestingModule } from '@nestjs/testing';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DishCategory } from '../../dish-category/entities/dish-category.entity';
import { DishService } from '../../dish/dish.service';
import { DishController } from '../../dish/dish.controller';
import { Body, UploadedFile } from '@nestjs/common';
import path from 'path';
import fs from 'fs';

describe('dish.controller.ts', () => {
  let service: DishService;
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
        TypeOrmModule.forFeature([DishCategory]),
      ],
      providers: [DishService],
      controllers: [DishController],
    }).compile();

    service = module.get<DishService>(DishService);
    controller = module.get<DishController>(DishController);
  });


  test('create', async ()=>{



    const filePath = path.join(__dirname, '../../Docs/Image/париж.jpg');
    const fileBuffer = fs.readFileSync(filePath);

    // Создаём объект, имитирующий файл Multer
    const mockFile = {
      buffer: fileBuffer,
      originalname: 'test.jpg',
      mimetype: 'image/jpeg',
    } as Multer.File;

    // Загружаем файл через сервис
    const savedImage = await service.uploadImage(mockFile);





    create(
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
  )
  })
})