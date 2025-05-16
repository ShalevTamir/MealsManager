import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Types } from "mongoose";
import { DailyMealPlanPopulated } from "src/daily-meal-plan/entities/daily-meal-plan.schema";
import { MenuItem } from "src/menu-item/entities/menu-item.schema";

export type ProfileDocument = Profile & Document;

@Schema()
export class Profile {
    @Prop({ required: true })
    username: string;

    @Prop({ required: true })
    imageName: string;

    @Prop({ type: [{ type: Types.ObjectId, ref: 'DailyMealPlan' }], required: false, default: [] })
    mealPlans: Types.ObjectId[]; 

    @Prop({ type: [{ type: Types.ObjectId, ref: 'MenuItem' }], required: false, default: [] })
    menuItems: Types.ObjectId[];
}

export const ProfileSchema = SchemaFactory.createForClass(Profile);

export type ProfilePopulated = Omit<Profile, 'mealPlans' | 'menuItems'> & {
    mealPlans: DailyMealPlanPopulated[];
    menuItems: MenuItem[];
};