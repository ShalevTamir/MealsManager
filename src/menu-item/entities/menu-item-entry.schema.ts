import { Prop, Schema } from "@nestjs/mongoose";
import { Types } from "mongoose";
import { MenuItem } from "./menu-item.schema";

@Schema({ id: false })
export class MenuItemEntry {
   @Prop({ type: Types.ObjectId, ref: 'MenuItem', required: true })
    menuItem: Types.ObjectId

    @Prop({ required: true })
    isReady: boolean;
}

export type MenuItemEntryPopulated = Omit<MenuItemEntry, 'menuItem'> & {
    menuItem: MenuItem;
};

export const DEFAULT_IS_READY_VALUE: boolean = false;