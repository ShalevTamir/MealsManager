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
  
  public createBulk(createDailyMealPlanDtos: CreateDailyMealPlanDto[]): Promise<DailyMealPlan[]> {
    const newDailyPlans = createDailyMealPlanDtos.map(dto => new this.dailyMealPlanModel(dto));
    return this.dailyMealPlanModel.insertMany(newDailyPlans);
  }

  public create(createDailyMealPlanDto: CreateDailyMealPlanDto): Promise<DailyMealPlan> {
    const newDailyPlan = new this.dailyMealPlanModel(createDailyMealPlanDto);
    return newDailyPlan.save();    
  }

  public findAll(): Promise<DailyMealPlan[]> {
    return this.dailyMealPlanModel.find().exec();    
  }

  public findOne(id: string): Promise<DailyMealPlan | null> {
    return this.dailyMealPlanModel.findById(id).exec();    
  }

  public findByDateRange(startDate: Date, endDate: Date): Promise<DailyMealPlan[]> {
    return this.dailyMealPlanModel.find({
      date: {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      },
    }).exec();
  }

  public update(id: string, updateDailyMealPlanDto: UpdateDailyMealPlanDto): Promise<DailyMealPlan | null> {
    return this.dailyMealPlanModel.findByIdAndUpdate(id, updateDailyMealPlanDto, { new: true }).exec();    
  }

  public async remove(id: string): Promise<boolean> {
    const deleted = await this.dailyMealPlanModel.findByIdAndDelete(id).exec();
    return deleted !== null;
  }
}
