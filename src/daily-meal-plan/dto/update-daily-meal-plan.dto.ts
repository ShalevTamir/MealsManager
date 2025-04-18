import { IsArray, IsDateString, IsMongoId } from 'class-validator';

export class UpdateDailyMealPlanDto {
    @IsDateString()
    date: string;

    @IsArray()
    @IsMongoId({ each: true })
    menuItemIds: string[];
}
