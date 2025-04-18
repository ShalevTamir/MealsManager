import { IsArray, IsDateString, IsMongoId, IsNotEmpty } from 'class-validator';
import { Types } from 'mongoose';
import { MenuItem } from 'src/menu-item/entities/menu-item.schema';

export class UpdateDailyMealPlanDto {
    @IsDateString()
    date: string;
    
    menuItemToAdd: MenuItem;
}
