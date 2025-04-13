import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MenuItemModule } from './menu-item/menu-item.module';
import { DailyMealPlanModule } from './daily-meal-plan/daily-meal-plan.module';

@Module({
  imports: [MenuItemModule, DailyMealPlanModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
