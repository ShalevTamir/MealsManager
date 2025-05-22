import { Body, Controller, Get, Post } from "@nestjs/common";
import { ProfileService } from "./profile.service";
import { CreateProfileDto } from "./dto/create-profile.dto";
import { Profile } from "./entities/profile.schema";
import { UpdateProfileDto } from "./dto/update-profile.dto";

@Controller('profile')
export class ProfileController {
    constructor(private readonly profileService: ProfileService) {}

    @Post()
    public create(@Body() createProfileDto: CreateProfileDto): Promise<Profile> {
        return this.profileService.create(createProfileDto);
    }

    @Get()
    public findAll(): Promise<Profile[]> {
        return this.profileService.findAll();
    }

    @Post('update')
    public update(@Body() createProfileDto: UpdateProfileDto): Promise<Profile> {
        return this.profileService.update(createProfileDto);
    }
}