import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, ObjectId, PopulateOptions, Types, UpdateResult } from 'mongoose';
import { CreateDailyMealPlanDto } from './dto/create-daily-meal-plan.dto';
import { UpdateDailyMealPlanDto } from './dto/update-daily-meal-plan.dto';
import { DailyMealPlan, DailyMealPlanDocument, DailyMealPlanPopulated, mealPlanPopulateArgs, MealPlanPopulateType } from './entities/daily-meal-plan.schema';
import { MenuItem } from 'src/menu-item/entities/menu-item.schema';
import { RemoveMenuItemDto } from './dto/remove-menu-item.dto';
import { DEFAULT_IS_READY_VALUE, MenuItemEntry, MenuItemEntryPopulated } from 'src/menu-item/entities/menu-item-entry.schema';

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
    return this.dailyMealPlanModel.find().populate<MealPlanPopulateType>(mealPlanPopulateArgs).exec() as Promise<DailyMealPlanPopulated[]>;    
  }

  public findByDate(date: string): Promise<DailyMealPlanPopulated | null> {
    return this.dailyMealPlanModel.findOne({ date }).populate<MealPlanPopulateType>(mealPlanPopulateArgs).exec() as Promise<DailyMealPlanPopulated | null>;    
  }

  public findByDateRange(startDate: string, endDate: string): Promise<DailyMealPlanPopulated[]> {    
    return this.dailyMealPlanModel.find({
      date: {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      },
    }).populate<MealPlanPopulateType>(mealPlanPopulateArgs).exec() as Promise<DailyMealPlanPopulated[]>;
  }

  public async update(updateDailyMealPlanDto: UpdateDailyMealPlanDto): Promise<DailyMealPlan> {
    const mealPlanToUpdate: DailyMealPlanPopulated = await this.findOrCreate(updateDailyMealPlanDto.date);        

    const populatedEntries: MenuItemEntryPopulated[] = mealPlanToUpdate.menuItemEntries.filter(menuItemEntry => menuItemEntry.menuItem.type !== updateDailyMealPlanDto.menuItemToAdd.type);
    populatedEntries.push({ menuItem: new MenuItem(updateDailyMealPlanDto.menuItemToAdd), isReady: DEFAULT_IS_READY_VALUE });
    const updatedMenuItems: MenuItemEntry[] = populatedEntries.map(populatedEntry => { return { isReady: populatedEntry.isReady, menuItem: populatedEntry.menuItem._id } });
    const updatedMealPlan: DailyMealPlan | null = await this.dailyMealPlanModel.findOneAndUpdate({ _id:  mealPlanToUpdate._id }, { menuItemEntries: updatedMenuItems }, { new: true }).exec();      
    return <DailyMealPlan>updatedMealPlan;
  }

  public async removeMenuItem(removeMenuItemDto: RemoveMenuItemDto): Promise<DailyMealPlan> {
    const mealPlanToUpdate: DailyMealPlan | null = await this.dailyMealPlanModel.findOne({ date: removeMenuItemDto.date }).exec();
    if (mealPlanToUpdate == null) {
      throw new BadRequestException('Meal plan not found');
    }

    const updatedMenuItems: MenuItemEntry[] = mealPlanToUpdate.menuItemEntries.filter(menuItemEntry => menuItemEntry.menuItem.toHexString() !== removeMenuItemDto.menuItemId);
    const updatedMealPlan: DailyMealPlan | null = await this.dailyMealPlanModel.findByIdAndUpdate(mealPlanToUpdate._id, { menuItemEntries: updatedMenuItems }, { new: true }).exec();
    return <DailyMealPlan>updatedMealPlan;
  }


  public async remove(id: string): Promise<boolean> {
    const deleted = await this.dailyMealPlanModel.findByIdAndDelete(id).exec();
    return deleted !== null;
  }

  private async findOrCreate(date: string): Promise<DailyMealPlanPopulated> {
    let mealPlan: DailyMealPlanPopulated | null = await this.findByDate(date);

    if (mealPlan === null) {
      const newMealPlan: DailyMealPlan = await this.create({ date });
      mealPlan = {
        _id: newMealPlan._id,
        date: newMealPlan.date,
        menuItemEntries: [],
      }
    }

    return mealPlan;
  }
}
