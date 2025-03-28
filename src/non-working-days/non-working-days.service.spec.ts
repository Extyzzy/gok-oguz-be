import { Test, TestingModule } from '@nestjs/testing';
import { NonWorkingDaysService } from './non-working-days.service';

describe('NonWorkingDaysService', () => {
  let service: NonWorkingDaysService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NonWorkingDaysService],
    }).compile();

    service = module.get<NonWorkingDaysService>(NonWorkingDaysService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
