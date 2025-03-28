import { Body, Injectable } from '@nestjs/common';
import { CreateNonWorkingDayDto } from './dto/create-non-working-day.dto';
import { UpdateNonWorkingDayDto } from './dto/update-non-working-day.dto';
import { InjectRepository } from '@nestjs/typeorm';
// import { DishCategory } from '../dish-category/entities/dish-category.entity';
import { Repository } from 'typeorm';
import { NonWorkingDays } from './entities/non-working-days.entity';

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
    date: Date,
    num: number
  ) {
    console.log("non-working-days.service.ts - createDateByDate()...");

    const newRecord = this.RepositoryNonWorkingDays.create({
      firstDay: date,
      numOfDays: num
    });
    return await this.RepositoryNonWorkingDays.save(newRecord);

    return 'This action adds a new nonWorkingDay';
  }
  //---------------------------------------------------------------------------


/*
  findAll() {
    return `This action returns all nonWorkingDays`;
  }

  findOne(id: number) {
    return `This action returns a #${id} nonWorkingDay`;
  }

  update(id: number, updateNonWorkingDayDto: UpdateNonWorkingDayDto) {
    return `This action updates a #${id} nonWorkingDay`;
  }

  remove(id: number) {
    return `This action removes a #${id} nonWorkingDay`;
  }
*/

}
