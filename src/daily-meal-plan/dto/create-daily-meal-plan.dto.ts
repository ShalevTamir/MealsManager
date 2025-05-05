import { IsMongoId, IsDateString, IsOptional, IsArray } from 'class-validator';
import { Types } from 'mongoose';

export class CreateDailyMealPlanDto {
  @IsDateString()
  date: string;

  @IsArray()
  @IsMongoId({ each: true })
  menuItemIds?: string[];
}
