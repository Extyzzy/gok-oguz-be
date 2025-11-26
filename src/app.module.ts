import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConsoleModule } from 'nestjs-console';
import { DishModule } from '@app/dish/dish.module';
import { DishCategoryModule } from '@app/dish-category/dish-category.module';
import { UsersModule } from '@app/users/users.module';
import { AuthModule } from '@app/auth/auth.module';
import { DatabaseSeedModule } from '@app/database/seed.module';
import { PageContentModule } from '@app/page-content/page-content.module';
import { typeOrmConfig } from '@app/config/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    DishModule,
    DishCategoryModule,
    UsersModule,
    AuthModule,
    ConsoleModule,
    DatabaseSeedModule,
    PageContentModule,
  ],
})
export class AppModule {}
