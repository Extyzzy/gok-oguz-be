import { Test, TestingModule } from '@nestjs/testing';
import { NonWorkingDaysController } from './non-working-days.controller';
import { NonWorkingDaysService } from './non-working-days.service';

describe('NonWorkingDaysController', () => {
  let controller: NonWorkingDaysController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NonWorkingDaysController],
      providers: [NonWorkingDaysService],
    }).compile();

    controller = module.get<NonWorkingDaysController>(NonWorkingDaysController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
