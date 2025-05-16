import { Module } from "@nestjs/common";
import { ProfileController } from "./profile.controller";
import { ProfileService } from "./profile.service";
import { MongooseModule } from "@nestjs/mongoose";
import { Profile, ProfileSchema } from "./entities/profile.schema";

@Module({
    controllers: [ProfileController],
    providers: [ProfileService],
    imports: [
        MongooseModule.forFeature([{ name: Profile.name, schema: ProfileSchema }]),
    ]
})
export class ProfileModule {}