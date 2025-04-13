import { Module } from '@nestjs/common';
import { DailyMealPlanService } from './daily-meal-plan.service';
import { DailyMealPlanController } from './daily-meal-plan.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { DailyMealPlan, DailyMealPlanSchema } from './entities/daily-meal-plan.schema';

@Module({
  controllers: [DailyMealPlanController],
  providers: [DailyMealPlanService],
  imports: [
    MongooseModule.forFeature([{ name: DailyMealPlan.name, schema: DailyMealPlanSchema }])
  ],
})
export class DailyMealPlanModule {}
