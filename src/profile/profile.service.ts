import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Profile, ProfileDocument } from "./entities/profile.schema";
import { Model } from "mongoose";
import { CreateProfileDto } from "./dto/create-profile.dto";

@Injectable()
export class ProfileService {
    constructor(
        @InjectModel(Profile.name) private readonly profileModel: Model<ProfileDocument>,
    ) {}

    public create(createProfileDto: CreateProfileDto): Promise<Profile> {
        const newProfile = new this.profileModel(createProfileDto);
        return newProfile.save();
    }

    public findAll(): Promise<Profile[]> {
        return this.profileModel.find().exec();
    }
}