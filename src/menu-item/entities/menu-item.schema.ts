import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { NutrientCategory } from 'src/common/entities/enums/nutrient-category.enum';

export type MenuItemDocument = MenuItem & Document;

@Schema()
export class MenuItem {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, enum: NutrientCategory })
  type: NutrientCategory;
}

export const MenuItemSchema = SchemaFactory.createForClass(MenuItem);
