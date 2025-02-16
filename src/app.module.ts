import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { AdminController } from './admin/admin.controller';
import { GoogleStrategy } from './auth/google.strategy';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { BotModule } from './bot/bot.module';
import { ScheduleModule } from '@nestjs/schedule';
import { AdminModule } from './admin/admin.module';
import { AdminService } from './admin/admin.service';
import { PassportModule } from '@nestjs/passport';
import { UserSchema } from './user/user.schema';

@Module({
  controllers: [AppController, AdminController],
  providers: [AppService, GoogleStrategy, AdminService],
  imports: [
    BotModule,
    AuthModule, 
    ConfigModule.forRoot({isGlobal:true, }),
    MongooseModule.forRoot(process.env.MONGO_URI!),
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    ScheduleModule.forRoot(),
    AdminModule,
    PassportModule.register({ session: true }),
    
  ],
})
export class AppModule {}
