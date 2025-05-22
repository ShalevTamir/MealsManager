import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Profile, ProfileDocument } from "./entities/profile.schema";
import { Model, UpdateQuery } from "mongoose";
import { CreateProfileDto } from "./dto/create-profile.dto";
import { UpdateProfileDto } from "./dto/update-profile.dto";

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

    public async findByUsername(username: string): Promise<Profile> {
        const profile: Profile | null = await this.profileModel.findOne({ username: username }).exec();
        if (profile == null) {
            throw new NotFoundException("Profile not found");
        }
        return profile;
    }

    public async update(updateProfileDto: UpdateProfileDto): Promise<Profile> {        
        const profileToUpdate: Profile = await this.findByUsername(updateProfileDto.username);
        profileToUpdate.imageName = updateProfileDto.imageName ?? profileToUpdate.imageName;
        
        this.profileModel.findOneAndUpdate({ _id: profileToUpdate._id }, )
       
    }
}