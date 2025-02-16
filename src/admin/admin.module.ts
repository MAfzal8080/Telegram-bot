import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { MongooseModule } from '@nestjs/mongoose';
import { TeleUserSchema } from 'src/user/teleuser.schema';
import { UserSchema } from 'src/user/user.schema';
import { UserService } from 'src/bot/user.service';
import { AuthService } from 'src/auth/auth.service';
import { GoogleAuthGuard } from 'src/auth/auth.guard';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    MongooseModule.forFeature([{ name: 'TeleUser', schema: TeleUserSchema }]),
    ],
  providers: [AdminService, UserService, AuthService, GoogleAuthGuard],
})
export class AdminModule {}
