import { Module } from '@nestjs/common';
import { BotService } from './bot.service';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { TeleUserSchema } from 'src/user/teleuser.schema';
import { BotController } from './bot.controller';
import { GoogleAuthGuard } from 'src/auth/auth.guard';
import { AuthService } from 'src/auth/auth.service';
import { UserSchema } from 'src/user/user.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'TeleUser', schema: TeleUserSchema }]),
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
  ],
  providers: [UserService, BotService, GoogleAuthGuard, AuthService],
  controllers: [BotController]
})
export class BotModule {}
