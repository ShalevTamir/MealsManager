import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DailyMealPlanService } from './daily-meal-plan.service';
import { CreateDailyMealPlanDto } from './dto/create-daily-meal-plan.dto';
import { UpdateDailyMealPlanDto } from './dto/update-daily-meal-plan.dto';

@Controller('daily-meal-plan')
export class DailyMealPlanController {
  constructor(private readonly dailyMealPlanService: DailyMealPlanService) {}

  @Post()
  create(@Body() createDailyMealPlanDto: CreateDailyMealPlanDto) {
    return this.dailyMealPlanService.create(createDailyMealPlanDto);
  }

  @Post('bulk')
  createBulk(@Body() createDailyMealPlanDtos: CreateDailyMealPlanDto[]) {
    return this.dailyMealPlanService.createBulk(createDailyMealPlanDtos);
  }

  @Get()
  findAll() {
    return this.dailyMealPlanService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.dailyMealPlanService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDailyMealPlanDto: UpdateDailyMealPlanDto) {
    return this.dailyMealPlanService.update(id, updateDailyMealPlanDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.dailyMealPlanService.remove(id);
  }
}
