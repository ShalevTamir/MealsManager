import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { MenuItem } from 'src/menu-item/entities/menu-item.schema';

export type DailyMealPlanDocument = DailyMealPlan & Document;

@Schema()
export class DailyMealPlan {
  @Prop({ required: true })
  date: Date;

  @Prop({ type: [Types.ObjectId], required: true })
  menuItems: MenuItem[];  
}

export const DailyMealPlanSchema = SchemaFactory.createForClass(DailyMealPlan);
