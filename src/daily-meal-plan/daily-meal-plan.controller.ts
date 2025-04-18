import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { DailyMealPlanService } from './daily-meal-plan.service';
import { CreateDailyMealPlanDto } from './dto/create-daily-meal-plan.dto';
import { UpdateDailyMealPlanDto } from './dto/update-daily-meal-plan.dto';
import { DailyMealPlan } from './entities/daily-meal-plan.schema';

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
  public findAll(): Promise<DailyMealPlan[]> {
    return this.dailyMealPlanService.findAll();
  }

  @Get(':id')
  public findOne(@Param('id') id: string): Promise<DailyMealPlan | null> {
    return this.dailyMealPlanService.findOne(id);
  }

  @Get('date-range')
  public findByDateRange(@Query('startDate') startDate: Date, @Query('endDate') endDate: Date): Promise<DailyMealPlan[]> {
    return this.dailyMealPlanService.findByDateRange(startDate, endDate);
  }

  @Patch(':id')
  public update(@Param('id') id: string, @Body() updateDailyMealPlanDto: UpdateDailyMealPlanDto): Promise<DailyMealPlan | null> {
    return this.dailyMealPlanService.update(id, updateDailyMealPlanDto);
  }

  @Delete(':id')
  public remove(@Param('id') id: string): Promise<boolean> {
    return this.dailyMealPlanService.remove(id);
  }
}
