import { Injectable } from '@nestjs/common';
import { CreateMenuItemDto } from './dto/create-menu-item.dto';
import { UpdateMenuItemDto } from './dto/update-menu-item.dto';
import { InjectModel } from '@nestjs/mongoose';
import { MenuItem, MenuItemDocument } from './entities/menu-item.schema';
import { Model } from 'mongoose';

@Injectable()
export class MenuItemService {
  constructor(@InjectModel(MenuItem.name) private readonly menuItemModel: Model<MenuItemDocument>) {}
  
  public createBulk(createMenuItemDtos: CreateMenuItemDto[]): Promise<MenuItem[]> {
    const newMenuItems = createMenuItemDtos.map(dto => new this.menuItemModel(dto));
    return this.menuItemModel.insertMany(newMenuItems);
  }

  public create(createMenuItemDto: CreateMenuItemDto): Promise<MenuItem> {
    const newMenuItem = new this.menuItemModel(createMenuItemDto);
    return newMenuItem.save();    
  }

  public findAll(): Promise<MenuItem[]> {
    return this.menuItemModel.find().exec();    
  }

  public findOne(id: string): Promise<MenuItem | null> {
    return this.menuItemModel.findById(id).exec();    
  }

  public update(id: string, updateMenuItemDto: UpdateMenuItemDto): Promise<MenuItem | null> {
    return this.menuItemModel.findByIdAndUpdate(id, updateMenuItemDto, { new: true }).exec();    
  }

  public async remove(id: string): Promise<boolean> {
    const deleted = await this.menuItemModel.findByIdAndDelete(id).exec();
    return deleted !== null
  }
}
