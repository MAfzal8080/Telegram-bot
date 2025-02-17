import { Controller, Delete, Get, Param, Post, Put, Req, Res, UseGuards } from '@nestjs/common';
import { BotService } from './bot.service';
import { GoogleAuthGuard } from 'src/auth/auth.guard';
import axios from 'axios';

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

    @Get('/block/:chatId')
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
