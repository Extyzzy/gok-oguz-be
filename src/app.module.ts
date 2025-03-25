import { join } from 'path';

import { Module } from '@nestjs/common';
import { ThrottlerModule } from '@nestjs/throttler';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';

import { DishModule } from './dish/dish.module';
import { DishCategoryModule } from './dish-category/dish-category.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.POSTGRES_URL,
      connectTimeoutMS: 10000,
      synchronize: true,
      // logging: ['query', 'warn', 'error'],
      autoLoadEntities: true,
      entities: [join(__dirname, '**', '*.entity.{ts,js}')],
    }),
    ThrottlerModule.forRoot([
      {
        ttl: 60000,
        limit: 3,
      },
    ]),
    AuthModule,
    UsersModule,
    DishModule,
    DishCategoryModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
