import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, UpdateResult } from 'mongoose';
import { CreateDailyMealPlanDto } from './dto/create-daily-meal-plan.dto';
import { UpdateDailyMealPlanDto } from './dto/update-daily-meal-plan.dto';
import { DailyMealPlan, DailyMealPlanDocument } from './entities/daily-meal-plan.schema';
import { MenuItem } from 'src/menu-item/entities/menu-item.schema';
import { Ref } from '@typegoose/typegoose';

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
    return this.dailyMealPlanModel.find().populate('menuItems').exec();    
  }

  public findByDate(date: string): Promise<DailyMealPlan | null> {
    return this.dailyMealPlanModel.findOne({ date }).populate("menuItems").exec();    
  }

  public findByDateRange(startDate: Date, endDate: Date): Promise<DailyMealPlan[]> {
    return this.dailyMealPlanModel.find({
      date: {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      },
    }).populate('menuItems').exec();
  }

  public async update(updateDailyMealPlanDto: UpdateDailyMealPlanDto): Promise<UpdateResult | null> {
    let { date, menuItems } = updateDailyMealPlanDto;
    const mealPlan: DailyMealPlan | null = await this.dailyMealPlanModel.findOne({ date }).exec();
    if (mealPlan !== null) {
      menuItems = [...mealPlan.menuItems, ...updateDailyMealPlanDto.menuItems];
      return this.dailyMealPlanModel.updateOne({ _id:  mealPlan._id }, { menuItems: menuItems }).exec();      
    }
    return null;
  }

  public async remove(id: string): Promise<boolean> {
    const deleted = await this.dailyMealPlanModel.findByIdAndDelete(id).exec();
    return deleted !== null;
  }
}
