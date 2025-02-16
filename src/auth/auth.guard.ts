import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from 'src/user/user.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class GoogleAuthGuard implements CanActivate {
  constructor(private authService: AuthService,
    @InjectModel('User') private userModel: Model<User>,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;
    if (!authHeader) {
      throw new UnauthorizedException('No authorization token found');
    }

    const token = authHeader.split(' ')[1];
    const existingUser = await this.userModel.findOne({ accessToken: token }).exec();
    try {
      return token == existingUser?.accessToken;
    } catch  {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
