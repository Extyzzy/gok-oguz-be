import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { NonWorkingDaysService } from './non-working-days.service';
import { CreateNonWorkingDayDto } from './dto/create-non-working-day.dto';
import { UpdateNonWorkingDayDto } from './dto/update-non-working-day.dto';

@Controller('non-working-days')
export class NonWorkingDaysController {
  constructor(private readonly nonWorkingDaysService: NonWorkingDaysService) {}


  //---------------------------------------------------------------------------
  // Post...
  //создать
  @Post('uploadbydate')
  async createDateByDate(
        @Body('date') date: Date,
        @Body('number') num: number
  ) {

    console.log("non-working-days.controller.ts - create()...");

    return this.nonWorkingDaysService.createDateByDate(date, num);
  }
  //---------------------------------------------------------------------------

  @Post('uploadbystring')
  async createDateByString(
    @Body('date') date: string,
    @Body('number') num: number
  ) {

    console.log("non-working-days.controller.ts - create()...");
    const timestamp = Date.parse(date); // Возвращает миллисекунды

    return this.nonWorkingDaysService.createDateByDate(timestamp, num);
  }
  // --- Post
  //---------------------------------------------------------------------------

/*
  @Get()
  findAll() {
    return this.nonWorkingDaysService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.nonWorkingDaysService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateNonWorkingDayDto: UpdateNonWorkingDayDto) {
    return this.nonWorkingDaysService.update(+id, updateNonWorkingDayDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.nonWorkingDaysService.remove(+id);
  }
*/

}
