import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { dataSourceOptions } from './typeorm.common';

export const typeOrmConfig: TypeOrmModuleOptions = {
  ...dataSourceOptions,
  autoLoadEntities: true,
};
