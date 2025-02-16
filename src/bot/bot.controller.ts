import { Controller, Delete, Get, Param, Put, Res, UseGuards } from '@nestjs/common';
// import { UserService } from './user.service';
import { BotService } from './bot.service';
import { GoogleAuthGuard } from 'src/auth/auth.guard';

@Controller('bot')
export class BotController {

    constructor(
        private readonly botService: BotService,
    ) { }

    @Get('/telegramUser')
    @UseGuards(GoogleAuthGuard)
    async getUsers(@Res() res) {
        const users = await this.botService.findAll();
        res.json({ users: users });
    }

    @Put('/:chatId/block')
    @UseGuards(GoogleAuthGuard)
    async blockChat(@Param('chatId') chatId: number) {
        return this.botService.blockChat(chatId);
    }

    @Delete('/:chatId/delete')
    @UseGuards(GoogleAuthGuard)
    async deleteUser(@Param('chatId') chatId:number) {
        return this.botService.deleteUser(chatId);
    }

}
