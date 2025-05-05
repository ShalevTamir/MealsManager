import { IsArray, IsDateString, IsMongoId, IsNotEmpty } from 'class-validator';
import { MenuItem } from 'src/menu-item/entities/menu-item.schema';
import { MenuItemDto } from './menu-item-dto.class';

export class UpdateDailyMealPlanDto {
    @IsDateString()
    date: string;
    
    menuItemToAdd: MenuItemDto;
}
