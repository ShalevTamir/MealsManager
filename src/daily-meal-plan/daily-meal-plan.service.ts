import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateDailyMealPlanDto } from './dto/create-daily-meal-plan.dto';
import { UpdateDailyMealPlanDto } from './dto/update-daily-meal-plan.dto';
import { DailyMealPlan, DailyMealPlanDocument } from './entities/daily-meal-plan.schema';

@Injectable()
export class DailyMealPlanService {
  constructor(
    @InjectModel(DailyMealPlan.name) private readonly dailyMealPlanModel: Model<DailyMealPlanDocument>,
  ) {}
  
  createBulk(createDailyMealPlanDtos: CreateDailyMealPlanDto[]): Promise<DailyMealPlan[]> {
    const newDailyPlans = createDailyMealPlanDtos.map(dto => new this.dailyMealPlanModel(dto));
    return this.dailyMealPlanModel.insertMany(newDailyPlans);
  }

  create(createDailyMealPlanDto: CreateDailyMealPlanDto): Promise<DailyMealPlan> {
    const newDailyPlan = new this.dailyMealPlanModel(createDailyMealPlanDto);
    return newDailyPlan.save();    
  }

  findAll(): Promise<DailyMealPlan[]> {
    return this.dailyMealPlanModel.find().exec();    
  }

  findOne(id: string): Promise<DailyMealPlan | null> {
    return this.dailyMealPlanModel.findById(id).exec();    
  }

  update(id: string, updateDailyMealPlanDto: UpdateDailyMealPlanDto): Promise<DailyMealPlan | null> {
    return this.dailyMealPlanModel.findByIdAndUpdate(id, updateDailyMealPlanDto, { new: true }).exec();    
  }

  async remove(id: string): Promise<boolean> {
    const deleted = await this.dailyMealPlanModel.findByIdAndDelete(id).exec();
    return deleted !== null;
  }
}
