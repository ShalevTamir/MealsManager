import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';
import { NutrientCategory } from 'src/common/entities/enums/nutrient-category.enum';
import { MenuItemDto } from 'src/daily-meal-plan/dto/menu-item-dto.class';

export type MenuItemDocument = MenuItem & Document;

@Schema()
export class MenuItem {
  _id: Types.ObjectId;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true, enum: NutrientCategory })
  type: NutrientCategory;

  constructor(menuItemDto: MenuItemDto) {
    this._id = new Types.ObjectId(menuItemDto._id);
    this.name = menuItemDto.name;
    this.type = menuItemDto.type;
  }
}

export const MenuItemSchema = SchemaFactory.createForClass(MenuItem);
