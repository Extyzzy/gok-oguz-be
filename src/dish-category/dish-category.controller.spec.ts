import { Test, TestingModule } from '@nestjs/testing';
/*
import { AppController } from './app.controller';
import { AppService } from './app.service';
*/
import { DishCategory } from './entities/dish-category.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DishCategoryService } from './dish-category.service';
import {DishCategoryController} from './dish-category.controller'

// import {Response} from "express";
// import {join} from "path";
// import mockResponse from 'jest-mock-express';

import * as dotenv from 'dotenv';
dotenv.config({ path: '.env.test' }); // Указываем путь к .env.test

console.log("TEST DATABASE URL:", process.env.POSTGRES_URL);

jest.setTimeout(30000);

describe('dish-category.controller', () => {
    let service: DishCategoryService;
    let controller: DishCategoryController;

    beforeAll(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [
/*
                TypeOrmModule.forRoot({
                    type: 'postgres',
                    host: 'localhost',
                    port: 5432,
                    username: 'postgres',
                    password: '',
                    database: '1903',
                    entities: [DishCategory],
                    synchronize: true, // ❗ Только для тестов! В проде - миграции
                }),
*/
                TypeOrmModule.forRoot({
/*
                    type: 'postgres',
                    url: process.env.POSTGRES_URL,
                    // connectTimeoutMS: 10000,
                    synchronize: true,
                    // logging: ['query', 'warn', 'error'],
                    autoLoadEntities: true,
                    // entities: [join(__dirname, '**', '*.entity.{ts,js}')],
                    entities: [DishCategory]
*/
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
            providers: [DishCategoryService],
            controllers: [DishCategoryController],
        }).compile();

        service = module.get<DishCategoryService>(DishCategoryService);
        controller = module.get<DishCategoryController>(DishCategoryController);
    });


    test('ImageFromName', async () => {

        const name = "Name_1";
/*
        const res = {
            status: jest.fn().mockReturnThis(), // 👈 status() должен возвращать res
            json: jest.fn(), // 👈 json() должен быть функцией
        } as any;
*/
        // const res = mockResponse();

        const res = {
            status: jest.fn().mockReturnThis(),   // mock for status
            json: jest.fn(),                      // mock for json
            setHeader: jest.fn(),                 // mock for setHeader
            send: jest.fn(),                      // mock for send
            redirect: jest.fn(),                  // mock for redirect
        } as any;  // Типизируем как `any`, чтобы избежать ошибок типов

        console.log("test(ImageFromName)...");

        /*const image =*/ await controller.getImageByName(name, res);

        if (res === undefined) {
            console.log("res === undefined");
        }
        else {
            console.log("res:", res.bufer);
        }

/*
        if (!image) {
            return res.status(404).json({ message: 'Image not found' });
        }
*/

    });
})