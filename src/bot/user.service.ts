import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TeleUser } from 'src/user/teleuser.schema';

@Injectable()
export class UserService {
  constructor(@InjectModel('TeleUser') private userModel: Model<TeleUser>) {}

  async logConversation(chatId: number, username: string, message: string): Promise<TeleUser> {
    let user = await this.userModel.findOne({ chatId }).exec();
    
    if (!user) {
      user = new this.userModel({ 
        chatId, 
        username,
        conversations: [{ message }] });
    }
    user.conversations.push({ message });
    return user.save();
  }

  async subscribeUser(chatId: number): Promise<any> {
    const user = await this.userModel.findOneAndUpdate(
      { chatId },
      { isSubscribe: true },
    ).exec();
    return user?.save();
  }

  async getSubscribedUsers(): Promise<TeleUser[]> {
    return this.userModel.find({ isSubscribe: true, isBlock: false }).exec();
  }

}
