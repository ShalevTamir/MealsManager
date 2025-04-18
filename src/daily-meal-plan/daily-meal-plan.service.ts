import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId, Types, UpdateResult } from 'mongoose';
import { CreateDailyMealPlanDto } from './dto/create-daily-meal-plan.dto';
import { UpdateDailyMealPlanDto } from './dto/update-daily-meal-plan.dto';
import { DailyMealPlan, DailyMealPlanDocument, DailyMealPlanPopulated } from './entities/daily-meal-plan.schema';
import { MenuItem } from 'src/menu-item/entities/menu-item.schema';

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

  public findAll(): Promise<DailyMealPlanPopulated[]> {
    return this.dailyMealPlanModel.find().populate<{ menuItems: MenuItem[] }>('menuItems').exec() as Promise<DailyMealPlanPopulated[]>;    
  }

  public findByDate(date: string): Promise<DailyMealPlanPopulated | null> {
    return this.dailyMealPlanModel.findOne({ date }).populate<{ menuItems: MenuItem[] }>("menuItems").exec() as Promise<DailyMealPlanPopulated | null>;    
  }

  public findByDateRange(startDate: Date, endDate: Date): Promise<DailyMealPlanPopulated[]> {
    return this.dailyMealPlanModel.find({
      date: {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      },
    }).populate<{ menuItems: MenuItem[] }>('menuItems').exec() as Promise<DailyMealPlanPopulated[]>;
  }

  public async update(updateDailyMealPlanDto: UpdateDailyMealPlanDto): Promise<DailyMealPlan> {
    const mealPlanToUpdate: DailyMealPlanPopulated = await this.findOrCreate(updateDailyMealPlanDto.date);        

    const updatedMenuItems: MenuItem[] = mealPlanToUpdate.menuItems.filter(menuItem => menuItem.type !== updateDailyMealPlanDto.menuItemToAdd.type);
    updatedMenuItems.push(updateDailyMealPlanDto.menuItemToAdd);
    const menuItemsIds: Types.ObjectId[] = updatedMenuItems.map(menuItem => menuItem._id);

    const updatedMealPlan: DailyMealPlan | null = await this.dailyMealPlanModel.findOneAndUpdate({ _id:  mealPlanToUpdate._id }, { menuItems: menuItemsIds }, { new: true }).exec();      
    return <DailyMealPlan>updatedMealPlan;
  }

  private async findOrCreate(date: string): Promise<DailyMealPlanPopulated> {
    let mealPlan: DailyMealPlanPopulated | null = await this.findByDate(date);

    if (mealPlan === null) {
      const newMealPlan: DailyMealPlan = await this.create({ date });
      mealPlan = {
        _id: newMealPlan._id,
        date: newMealPlan.date,
        menuItems: [],
      }
    }

    return mealPlan;
  }


  public async remove(id: string): Promise<boolean> {
    const deleted = await this.dailyMealPlanModel.findByIdAndDelete(id).exec();
    return deleted !== null;
  }
}
