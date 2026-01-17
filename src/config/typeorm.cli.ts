import { DataSource } from 'typeorm';
import { DataSourceOptions } from 'typeorm';
import { config as dotenvConfig } from 'dotenv';
import 'tsconfig-paths/register';

dotenvConfig({ path: '.env' });

const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DATABASE_HOST,
  port: parseInt(process.env.DATABASE_PORT || '5432', 10),
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  entities: ['src/**/*.entity.ts'],
  migrations: ['src/database/migrations/*.ts'],
  synchronize: true,
};

export default new DataSource(dataSourceOptions);
