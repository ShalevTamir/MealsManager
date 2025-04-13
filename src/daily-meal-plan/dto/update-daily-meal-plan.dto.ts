import { PartialType } from '@nestjs/mapped-types';
import { CreateDailyMealPlanDto } from './create-daily-meal-plan.dto';

export class UpdateDailyMealPlanDto extends PartialType(CreateDailyMealPlanDto) {}
