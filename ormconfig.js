require('./env.config');

import { DataSource } from 'typeorm';

const connectionSource = new DataSource({
  type: 'postgres',
  url: process.env.POSTGRES_URL,
  connectTimeoutMS: 10000,
  synchronize: false,
  logging: ['query', 'warn', 'error'],
  entities: ['src/**/*.entity.ts'],
  migrations: ['db/migrations/**/*.ts'],
  subscribers: ['db/subscribers/**/*.ts'],
});

export default connectionSource;
