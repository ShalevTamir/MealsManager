import { IsMongoId, IsDateString, IsOptional } from 'class-validator';

export class CreateDailyMealPlanDto {
  @IsDateString()
  date: string;

  @IsMongoId()
  @IsOptional()
  carb?: string;

  @IsMongoId()
  @IsOptional()
  protein?: string;

  @IsMongoId()
  @IsOptional()
  extra?: string;
}
