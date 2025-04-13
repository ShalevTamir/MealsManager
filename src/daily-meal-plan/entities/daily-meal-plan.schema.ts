import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { MenuItem } from 'src/menu-item/entities/menu-item.schema';

export type DailyMealPlanDocument = DailyMealPlan & Document;

@Schema()
export class DailyMealPlan {
  @Prop({ required: true })
  date: Date;

  @Prop({ type: Types.ObjectId, ref: 'MenuItem', required: true })
  carb: MenuItem;

  @Prop({ type: Types.ObjectId, ref: 'MenuItem', required: true })
  protein: MenuItem;

  @Prop({ type: Types.ObjectId, ref: 'MenuItem', required: true })
  extra: MenuItem;
}

export const DailyMealPlanSchema = SchemaFactory.createForClass(DailyMealPlan);
