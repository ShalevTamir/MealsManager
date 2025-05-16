import { IsArray, IsMongoId, IsString } from "class-validator";

export class CreateProfileDto {
    @IsString()
    username: string;

    @IsString()
    imageName: string;

    @IsArray()
    @IsMongoId({ each: true })
    mealPlans?: string[];

    @IsArray()
    @IsMongoId({ each: true })
    menuItems?: string[];
}