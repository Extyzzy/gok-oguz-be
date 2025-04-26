import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DatabaseSeedService } from './database/seed.service';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule);
  const seedService = app.get(DatabaseSeedService);

  try {
    await seedService.seedAdminUser(); // or call other seed methods here
    console.log('✅ Admin user seeded successfully.');
  } catch (error) {
    console.error('❌ Seeding failed:', error);
  } finally {
    await app.close();
  }
}

bootstrap();
