import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from '../users/entities/user.entity';
import { DatabaseSeedService } from './seed.service';
import { SeedCommand } from './seed.command';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [DatabaseSeedService, SeedCommand],
  exports: [DatabaseSeedService],
})
export class DatabaseSeedModule {}
