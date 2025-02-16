import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, VerifyCallback } from "passport-google-oauth20"
import { AuthService } from "./auth.service";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User } from "src/user/user.schema";

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google'){
    constructor(private authService: AuthService,
        @InjectModel('User') private userModel: Model<User>,
    ) {
        super({
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackURL: process.env.GOOGLE_CALLBACK_URL,
            scope: ['email', 'profile'],
        })
    }

    async validate(accessToken: string, refreshToken: string, profile: any, done: VerifyCallback): Promise<any>{
        const {name, emails, photos} = profile;
        const user = new this.userModel({
            email: emails[0].value,
            firstName: name.givenName,
            lastName: name.familyName,
            picture: photos[0].value,
            accessToken: accessToken,
        })

        const exist = await this.authService.findOrCreateUser(user);
        done(null, exist);
    }
}