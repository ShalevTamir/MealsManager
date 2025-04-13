import { Injectable } from '@nestjs/common';
import { CreateDailyMealPlanDto } from './dto/create-daily-meal-plan.dto';
import { UpdateDailyMealPlanDto } from './dto/update-daily-meal-plan.dto';

@Injectable()
export class DailyMealPlanService {
  create(createDailyMealPlanDto: CreateDailyMealPlanDto) {
    return 'This action adds a new dailyMealPlan';
  }

  findAll() {
    return `This action returns all dailyMealPlan`;
  }

  findOne(id: number) {
    return `This action returns a #${id} dailyMealPlan`;
  }

  update(id: number, updateDailyMealPlanDto: UpdateDailyMealPlanDto) {
    return `This action updates a #${id} dailyMealPlan`;
  }

  remove(id: number) {
    return `This action removes a #${id} dailyMealPlan`;
  }
}
