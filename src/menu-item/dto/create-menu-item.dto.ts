import { IsString, IsEnum } from 'class-validator';
import { NutrientCategory } from 'src/common/entities/enums/nutrient-category.enum';

export class CreateMenuItemDto {
  @IsString()
  name: string;

  @IsEnum(NutrientCategory)
  type: NutrientCategory;
}
