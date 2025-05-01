import { IsDateString, IsMongoId } from "class-validator";

export class RemoveMenuItemDto {
    @IsDateString()
    date: string;

    @IsMongoId()
    menuItemId: string;
}