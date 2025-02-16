import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  googleLogin(req, res) {
    if(!req.user){
      return 'No user from google';
    }
    const url = `http://localhost:5173/login?token=${req.user.accessToken}&email=${req.user.email}&picture=${req.user.picture}`;
    res.redirect(302, url);
    return {
      message: 'User info from google',
      user: req.user
    }
  }
}
