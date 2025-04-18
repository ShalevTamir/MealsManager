import { IsMongoId, IsDateString, IsOptional, IsArray } from 'class-validator';

export class CreateDailyMealPlanDto {
  @IsDateString()
  date: string;

  @IsArray()
  @IsMongoId({ each: true })
  menuItemIds: string[];
}
