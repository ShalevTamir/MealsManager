import { IsArray, IsDateString, IsMongoId, IsNotEmpty } from 'class-validator';
import { MenuItem } from 'src/menu-item/entities/menu-item.schema';
import { MenuItemDto } from './menu-item.dto';
import { MenuItemEntryDto } from './menu-item-entry.dto';

export class UpdateDailyMealPlanDto {
    @IsDateString()
    date: string;
    
    editedEntry: MenuItemEntryDto;
}
