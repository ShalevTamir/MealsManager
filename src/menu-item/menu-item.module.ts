import { Module } from '@nestjs/common';
import { MenuItemService } from './menu-item.service';
import { MenuItemController } from './menu-item.controller';
import { MenuItem, MenuItemSchema } from './entities/menu-item.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  controllers: [MenuItemController],
  providers: [MenuItemService],
  imports: [
    MongooseModule.forFeature([{ name: MenuItem.name, schema: MenuItemSchema }])
  ]
})
export class MenuItemModule {}
