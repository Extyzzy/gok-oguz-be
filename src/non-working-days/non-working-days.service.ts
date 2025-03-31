import { Body, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NonWorkingDays } from './entities/non-working-days.entity';
import { LessThan } from "typeorm";

@Injectable()
export class NonWorkingDaysService {


  constructor(
    @InjectRepository(NonWorkingDays)
    private readonly RepositoryNonWorkingDays: Repository<NonWorkingDays>,
  ){
    // console.log("dish-category.service.ts - class DishCategoryService - constructor()");
  }
  //---------------------------------------------------------------------------

  async createDateByDate(
    date: string,
    num: number
  ) {
      console.log("non-working-days.service.ts - createDateByDate()...");
      console.log("non-working-days.service.ts - createDateByDate() - date: ", date, ", num: ", num);

    const timestamp = new Date(date); // Преобразуем строку в дату

    console.log("non-working-days.service.ts - createDateByDate() - timestamp: ", timestamp);

    const newRecord = this.RepositoryNonWorkingDays.create({
      firstDay: timestamp,
      numOfDays: num
    });

    return await this.RepositoryNonWorkingDays.save(newRecord);
  }
  //---------------------------------------------------------------------------

  async getAll(){
    console.log("non-working-days.service.ts - getAll()...");

    return this.RepositoryNonWorkingDays.find();
  }
  //---------------------------------------------------------------------------


  async getBeforeDate(date :string) {

      console.log("non-working-days.service.ts - getRecgetRecBeforeDateDate() - date: ", date);

    const timestamp = new Date(date);
      console.log("non-working-days.service.ts - getRecgetRecBeforeDateDate() - timestamp: ", timestamp);

    const ret = await this.RepositoryNonWorkingDays.find({ where: { firstDay: LessThan(timestamp)  } });
      console.log("non-working-days.service.ts - getRecgetRecBeforeDateDate() - ret: ", ret);
    if (!ret) {
      console.log(`non-working-days.service.ts - getRecgetRecBeforeDateDate() - record not found (date: ${date})`);
      return `record not found (date: ${date})`;
    }

    return ret;
  }
  //---------------------------------------------------------------------------

  async updateRecordByDate(date: string, newDate : string, numberOfDays: number) {

    // console.log("non-working-days.service.ts - updateRecordByDate() - date: ", date);
    console.log(`non-working-days.service.ts - updateRecordByDate() - date: ${date}, newDate: ${newDate}, numberOfDays: ${numberOfDays}`);

    const dateTimestamp = new Date(date);
    const newDateTimestamp = new Date(newDate);
    console.log(`KT - 1`);

    const record = await this.RepositoryNonWorkingDays.findOne({ where: { firstDay: dateTimestamp } });
    if (!record) {
      console.log(`non-working-days.service.ts - updateRecordByDate() - record not found (date: ${date})`);
      return `record not found (date: ${date})`;
    }

    record.firstDay = newDateTimestamp;
    record.numOfDays = numberOfDays;

    return await this.RepositoryNonWorkingDays.save(record);
  }
  //---------------------------------------------------------------------------

  async updateRecordById(id: number, newDate : string, numberOfDays: number) {

    console.log(`non-working-days.service.ts - updateRecordById() - id: ${id}, newDate: ${newDate}, numberOfDays: ${numberOfDays}`);

    const newDateTimestamp = new Date(newDate);

    const record = await this.RepositoryNonWorkingDays.findOne({ where: { id } });
    if (!record) {
      console.log(`non-working-days.service.ts - updateRecordById() - record not found (id: ${id})`);
      return `record not found (id: ${id})`;
    }

    record.firstDay = newDateTimestamp;
    record.numOfDays = numberOfDays;

    return await this.RepositoryNonWorkingDays.save(record);
  }
  //---------------------------------------------------------------------------

  async deleteRecordById(id: number): Promise<{ message: string }> {
    console.log("non-working-days.service.ts - deleteRecordById() - id:", id);

    const deleteResult = await this.RepositoryNonWorkingDays.delete(id);

    if (deleteResult.affected === 0) {
      return { message: "Запись не найдена" };
    }

    return { message: `Запись с id: '${id}' удалена` };
  }
  //---------------------------------------------------------------------------

}
