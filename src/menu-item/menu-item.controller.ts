import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { MenuItemService } from './menu-item.service';
import { CreateMenuItemDto } from './dto/create-menu-item.dto';
import { UpdateMenuItemDto } from './dto/update-menu-item.dto';
import { ProfileUsername } from 'src/profile/decorators/profile-username.decorator';

@Controller('menu-item')
export class MenuItemController {
  constructor(private readonly menuItemService: MenuItemService) {}

  @Post()
  public create(@Body() createMenuItemDto: CreateMenuItemDto): Promise<CreateMenuItemDto> {
    return this.menuItemService.create(createMenuItemDto);
  }

  @Post('bulk')
  public createBulk(@Body() createMenuItemDtos: CreateMenuItemDto[]): Promise<CreateMenuItemDto[]> {
    return this.menuItemService.createBulk(createMenuItemDtos);
  }

  @Get()
  public findAll(@ProfileUsername() profileUsername): Promise<CreateMenuItemDto[]> {
    return this.menuItemService.findAll(profileUsername);
  }

  @Get(':id')
  public findOne(@Param('id') id: string): Promise<CreateMenuItemDto | null> {
    return this.menuItemService.findOne(id);
  }

  @Patch(':id')
  public update(@Param('id') id: string, @Body() updateMenuItemDto: UpdateMenuItemDto): Promise<CreateMenuItemDto | null> {
    return this.menuItemService.update(id, updateMenuItemDto);
  }

  @Delete(':id')
  public remove(@Param('id') id: string): Promise<boolean> {
    return this.menuItemService.remove(id);
  }
}
