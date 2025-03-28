import { Module } from '@nestjs/common';
import { NonWorkingDaysService } from './non-working-days.service';
import { NonWorkingDaysController } from './non-working-days.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NonWorkingDays } from './entities/non-working-days.entity';

@Module({
  imports: [TypeOrmModule.forFeature([NonWorkingDays])],
  controllers: [NonWorkingDaysController],
  providers: [NonWorkingDaysService]
})
export class NonWorkingDaysModule {}
