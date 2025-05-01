import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { DailyMealPlanService } from './daily-meal-plan.service';
import { CreateDailyMealPlanDto } from './dto/create-daily-meal-plan.dto';
import { UpdateDailyMealPlanDto } from './dto/update-daily-meal-plan.dto';
import { DailyMealPlan, DailyMealPlanPopulated } from './entities/daily-meal-plan.schema';
import { RemoveMenuItemDto } from './dto/remove-menu-item.dto';

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
    console.log('findAll called');
    return this.dailyMealPlanService.findAll();
  }
  
  @Get('/date-range')
  public findByDateRange(@Query('startDate') startDate: string, @Query('endDate') endDate: string): Promise<DailyMealPlanPopulated[]> {    
    return this.dailyMealPlanService.findByDateRange(startDate, endDate);
  }

  @Get(':date')
  public findOne(@Param('date') date: string) {
    return this.dailyMealPlanService.findByDate(date);
  }


  @Patch('edit-menu-item')
  public update(@Body() updateDailyMealPlanDto: UpdateDailyMealPlanDto): Promise<DailyMealPlan> {
    return this.dailyMealPlanService.update(updateDailyMealPlanDto);
  }

  @Patch('remove-menu-item') 
  public removeMenuItem(@Body() removeMenuItemDto: RemoveMenuItemDto): Promise<DailyMealPlan> {
    return this.dailyMealPlanService.removeMenuItem(removeMenuItemDto);
  }

  @Delete(':id')
  public remove(@Param('id') id: string): Promise<boolean> {
    return this.dailyMealPlanService.remove(id);
  }
}
