import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { NonWorkingDaysService } from './non-working-days.service';

@Controller('non-working-days')
export class NonWorkingDaysController {
  constructor(private readonly nonWorkingDaysService: NonWorkingDaysService) {}


  //---------------------------------------------------------------------------
  // Post...
  //создать
  @Post('uploadbydate')
  async createDateByDate(
        @Body('date') date: string,
        @Body('numberofdays') num: number
  ) {

    console.log("non-working-days.controller.ts - createDateByDate()...");
    console.log("non-working-days.controller.ts - createDateByDate() - date: ", date, ", num: ", num);

    return this.nonWorkingDaysService.createDateByDate(date, num);
  }
  //---------------------------------------------------------------------------

  // --- Post
  //---------------------------------------------------------------------------


  //---------------------------------------------------------------------------
  // Get...
  //получить все записи
  @Get()
  async getAll(){
    console.log("non-working-days.controller.ts - getAll()...");

    return this.nonWorkingDaysService.getAll();
  }
  //---------------------------------------------------------------------------

  //получить записи меньше указанной даты
  @Get('recordbeforedate/:date')
  async getRecBeforeDate(@Param('date') date :string){
    console.log("non-working-days.controller.ts - getRecBeforeDate()...");
    console.log("non-working-days.controller.ts - getRecBeforeDate() - date: ", date);

    return this.nonWorkingDaysService.getBeforeDate(date);
  }
  //---------------------------------------------------------------------------

  // ---Get
  //---------------------------------------------------------------------------


  //---------------------------------------------------------------------------
  // Patch...
  //изменить по id
  @Patch('recordbyid/:id')
  async updateRecordById(
    @Param('id') id: number,
    @Body('newdate') newDate : string,
    @Body('numberofdays') numberOfDays: number
  ) {

    console.log("non-working-days.controller.ts - updateRecordById()...");
    console.log(`non-working-days.controller.ts - updateRecordById() - id: ${id}, newDate: ${newDate}, numberOfDays: ${numberOfDays}`);

    return this.nonWorkingDaysService.updateRecordById(id, newDate, numberOfDays);
  }
  //---------------------------------------------------------------------------

  //изменить по дате
  @Patch('recordbydate/:date')
  async updateRecordByDate(
    @Param('date') date: string,
    @Body('newdate') newDate : string,
    @Body('numberofdays') numberOfDays: number
  ) {

    console.log("non-working-days.controller.ts - updateRecordByDate()...");
    console.log(`non-working-days.controller.ts - updateRecordByDate() - date: ${date}, newDate: ${newDate}, numberOfDays: ${numberOfDays}`);

    return this.nonWorkingDaysService.updateRecordByDate(date, newDate, numberOfDays);
  }
  //---------------------------------------------------------------------------

  // --- Patch
  //---------------------------------------------------------------------------


  //---------------------------------------------------------------------------
  // Delete...
  //удалить запись по id
  @Delete('recordbyid/:id')
  async deleteRecordByName(@Param('id') id: number) {

    console.log("non-working-days.controller.ts - deleteRecordByName()...");
    console.log(`non-working-days.controller.ts - deleteRecordByName() - id: ${id}`);

    return await this.nonWorkingDaysService.deleteRecordById(id);
  }
  //---------------------------------------------------------------------------

  // --- Delete
  //---------------------------------------------------------------------------

}
