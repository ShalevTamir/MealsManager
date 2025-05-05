import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, PopulateOptions, Types } from 'mongoose';
import { MenuItemEntry, MenuItemEntryPopulated } from 'src/menu-item/entities/menu-item-entry.schema';

export type DailyMealPlanDocument = DailyMealPlan & Document;

@Schema()
export class DailyMealPlan {
  _id: Types.ObjectId;

  @Prop({ required: true })
  date: Date;

  @Prop({ required: false, default: [] })
  menuItemEntries: MenuItemEntry[] 
}

export const DailyMealPlanSchema = SchemaFactory.createForClass(DailyMealPlan);

export type DailyMealPlanPopulated = Omit<DailyMealPlan, 'menuItemEntries'> & {
  menuItemEntries: MenuItemEntryPopulated[];
};

export type MealPlanPopulateType = {
  menuItemEntries: MenuItemEntryPopulated[];
};

export const mealPlanPopulateArgs: PopulateOptions = { path: 'menuItemEntries.menuItem', model: 'MenuItem' };