import '../env.config.js';
import 'reflect-metadata';

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DataSource } from 'typeorm';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const dataSource = app.get(DataSource);

  let dbName: string | undefined;

  if (process.env.POSTGRES_URL) {
    try {
      const dbUrl = new URL(process.env.POSTGRES_URL);
      dbName = dbUrl.pathname.substring(1).split('?')[0]; // Получаем имя БД после "/"
    } catch (error) {
      console.error('❌ Ошибка парсинга POSTGRES_URL:', error);
    }
  }

  if (dataSource.isInitialized) {
    console.log(`✅ Подключение к PostgreSQL успешно установлено. Используется база данных: ${dbName}`);
  } else {
    console.error('❌ Ошибка подключения к PostgreSQL');
  }

  await app.listen(3000);
}
bootstrap();
