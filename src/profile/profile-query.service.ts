import { Injectable } from "@nestjs/common";
import { Model, Query } from "mongoose";
import { Profile, ProfileDocument } from "./entities/profile.schema";
import { InjectModel } from "@nestjs/mongoose";

@Injectable()
export class ProfileQueryService {
    constructor(
            @InjectModel(Profile.name) private readonly profileModel: Model<ProfileDocument>,
    ) {}
    

    public findByUsername(username: string): Query<ProfileDocument | null, ProfileDocument> {
        return this.profileModel.findOne({ username: username });
    }
}