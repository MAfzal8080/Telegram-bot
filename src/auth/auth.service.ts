import { Injectable } from '@nestjs/common';
// import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/user/user.schema';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel('User') private userModel: Model<User>,
) { }

  async findOrCreateUser(profile: User) {
    const existingUser = await this.userModel.findOne({ email: profile.email }).exec();
    if (existingUser) {
      existingUser.accessToken = profile.accessToken;
      return existingUser.save();
    }
    const newUser = new this.userModel(profile);
    return newUser.save();
  }

}
