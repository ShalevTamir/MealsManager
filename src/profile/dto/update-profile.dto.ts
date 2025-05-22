import { IsArray, IsMongoId, IsString } from "class-validator";

export class UpdateProfileDto {
    @IsString()
    username: string;

    @IsString()
    imageName?: string;

    @IsArray()
    @IsMongoId({ each: true })
    mealPlansToAdd?: string[];

    @IsArray()
    @IsMongoId({ each: true })
    menuItemsToAdd?: string[];
}