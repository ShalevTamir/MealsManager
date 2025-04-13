import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MenuItemModule } from './menu-item/menu-item.module';
import { DailyMealPlanModule } from './daily-meal-plan/daily-meal-plan.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MenuItemModule,
    DailyMealPlanModule,
    MongooseModule.forRoot('mongodb+srv://shalev:6GnDc8MW8y890mQr@cluster0.rjk3l.mongodb.net/meals')
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
