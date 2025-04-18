import { IsArray, IsDateString, IsMongoId, IsNotEmpty } from 'class-validator';
import { Types } from 'mongoose';

export class UpdateDailyMealPlanDto {
    @IsDateString()
    date: string;
    
    @IsArray()
    @IsMongoId({ each: true })
    menuItems: Types.ObjectId[];
}
