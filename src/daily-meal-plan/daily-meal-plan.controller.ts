import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { DailyMealPlanService } from './daily-meal-plan.service';
import { CreateDailyMealPlanDto } from './dto/create-daily-meal-plan.dto';
import { UpdateDailyMealPlanDto } from './dto/update-daily-meal-plan.dto';
import { DailyMealPlan, DailyMealPlanPopulated } from './entities/daily-meal-plan.schema';
import { UpdateResult } from 'mongoose';

@Controller('daily-meal-plan')
export class DailyMealPlanController {
  constructor(private readonly dailyMealPlanService: DailyMealPlanService) {}

  @Post()
  public create(@Body() createDailyMealPlanDto: CreateDailyMealPlanDto): Promise<DailyMealPlan> {
    return this.dailyMealPlanService.create(createDailyMealPlanDto);
  }

  @Post('bulk')
  public createBulk(@Body() createDailyMealPlanDtos: CreateDailyMealPlanDto[]): Promise<DailyMealPlan[]> {
    return this.dailyMealPlanService.createBulk(createDailyMealPlanDtos);
  }

  @Get()
  public findAll(): Promise<DailyMealPlanPopulated[]> {
    return this.dailyMealPlanService.findAll();
  }

  @Get(':date')
  public findOne(@Param('date') date: string) {
    return this.dailyMealPlanService.findByDate(date);
  }

  @Get('date-range')
  public findByDateRange(@Query('startDate') startDate: Date, @Query('endDate') endDate: Date): Promise<DailyMealPlanPopulated[]> {
    return this.dailyMealPlanService.findByDateRange(startDate, endDate);
  }

  @Patch()
  public update(@Body() updateDailyMealPlanDto: UpdateDailyMealPlanDto): Promise<DailyMealPlan> {
    return this.dailyMealPlanService.update(updateDailyMealPlanDto);
  }

  @Delete(':id')
  public remove(@Param('id') id: string): Promise<boolean> {
    return this.dailyMealPlanService.remove(id);
  }
}
