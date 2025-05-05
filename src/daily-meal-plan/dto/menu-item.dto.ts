import { IsMongoId } from "class-validator";
import { NutrientCategory } from "src/common/entities/enums/nutrient-category.enum";

export class MenuItemDto {
    @IsMongoId()
    _id: string;
    name: string;
    type: NutrientCategory;
}