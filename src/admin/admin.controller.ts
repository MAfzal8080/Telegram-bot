import { Controller, Put, Req, Res, UseGuards } from '@nestjs/common';
import { GoogleAuthGuard } from 'src/auth/auth.guard';
import { Request } from 'express';

@Controller('admin')
export class AdminController {
    constructor() {}

    @Put('dashboard')
    @UseGuards(GoogleAuthGuard)
    async getDashboard(@Req() req: Request, @Res() res) {
        res.json({ message: 'Welcome to the admin dashboard', user: req.headers.authorization });
    }

}
