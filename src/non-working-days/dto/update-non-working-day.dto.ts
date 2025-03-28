import { PartialType } from '@nestjs/swagger';
import { CreateNonWorkingDayDto } from './create-non-working-day.dto';

export class UpdateNonWorkingDayDto extends PartialType(CreateNonWorkingDayDto) {}
