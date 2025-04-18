import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type DailyMealPlanDocument = DailyMealPlan & Document;

@Schema()
export class DailyMealPlan {
  _id: Types.ObjectId;

  @Prop({ required: true })
  date: Date;

  @Prop({ type: [{type: Types.ObjectId, ref: 'MenuItem'}], required: false, default: [] })
  menuItems: Types.ObjectId[] 
}

export const DailyMealPlanSchema = SchemaFactory.createForClass(DailyMealPlan);
