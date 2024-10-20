require('./env.config');

module.exports = {
  type: 'postgres',
  url: process.env.POSTGRES_URL,
  connectTimeoutMS: 10000,
  synchronize: false,
  logging: ['query', 'warn', 'error'],
  entities: ['src/**/*.entity.ts'],
  migrations: ['db/migrations/**/*.ts'],
  subscribers: ['db/subscribers/**/*.ts'],
  seeds: ['db/seeds/*.ts'],
  cli: {
    migrationsDir: 'db/migrations',
    subscribersDir: 'db/subscribers',
  },
};
