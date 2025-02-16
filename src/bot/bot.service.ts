import { Injectable, NotFoundException } from '@nestjs/common';
import axios from 'axios';
import * as TelegramBot from 'node-telegram-bot-api';
import { UserService } from './user.service';
import { TeleUser } from 'src/user/teleuser.schema';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Interval } from '@nestjs/schedule';

@Injectable()
export class BotService {
    private bot: TelegramBot;

    constructor(private readonly userService: UserService, @InjectModel('TeleUser') private userModel: Model<TeleUser>) {
        this.bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, { polling: true });
        this.bot.onText(/\/start/, async (msg) => {
            this.bot.sendMessage(msg.chat.id, 'Welcome to the Weather Bot \n What is your current city?');
            await this.userService.logConversation(msg.chat.id, msg.chat.username, msg.text);
        })

        this.bot.on('message', async (msg) => {
            const chatId = msg.chat.id;
            const check = await this.checkBlock(chatId)
            if (check) {
                this.bot.sendMessage(chatId, 'You have been blocked by the admin');
            } else {
                const text = msg.text;
                if (text !== '/start' && !text.startsWith('/')) {
                    const cityName = text;
                    this.sendWeatherUpdate(chatId, cityName);
                    await this.userService.logConversation(msg.chat.id, msg.chat.username, msg.text);
                }
            }
        })

        this.bot.onText(/\/subscribe/, async (msg) => {
            const chatId = msg.chat.id;
            const check = await this.checkBlock(chatId)
            if (check) {
                this.bot.sendMessage(chatId, 'You have been blocked by the admin');
            } else {
                const check = await this.userService.subscribeUser(chatId);
                var message;
                await this.userService.logConversation(msg.chat.id, msg.chat.username, msg.text);
                if (check.isSubscribe == true) {
                    message = "You have already subscribe to our weather sevice";
                } else if (check.isSubscribe == false) {
                    message = "You have subscribe to our weather sevice";
                } else {
                    message = "Some problem occured";
                }
                this.bot.sendMessage(chatId, message);
                await this.userService.logConversation(msg.chat.id, msg.chat.username, msg.text);
            }
        });
    }

    async sendWeatherUpdate(chatId: number, cityName: string) {
        var message;
        try {
            const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${process.env.WEATHER_API_KEY}`);
            const weatherData = response.data;

            message = `Today's weather in your_city: ${cityName}\n${weatherData.weather[0].description}\nTemperature: ${(weatherData.main.temp / 10).toFixed(3)}°C \nFeel like: ${(weatherData.main.feels_like / 10).toFixed(3)}°C \nMinimum temperature: ${(weatherData.main.temp_min / 10).toFixed(3)}°C \nMaximum temperature: ${(weatherData.main.temp_max / 10).toFixed(3)}°C \nHumidity: ${weatherData.main.humidity} \nWind speed: ${weatherData.wind.speed}km/h`;
        } catch (error) {
            message = "Some error occured";
        }

        this.bot.sendMessage(chatId, message);
        // this.sub(chatId)
    }

    sub(chatId: number) {
        const options = {
            reply_markup: {
                keyboard: [
                    [{ text: '/subscribe' }],
                ],
                resize_keyboard: true,
                one_time_keyboard: true,
            },
        };
        this.bot.sendMessage(chatId, "You have been subscribed to our weather sevice", options);
    }

    @Interval(10000)
    async handleInterval() {
        const users = await this.userService.getSubscribedUsers();
        var city;
        if (users && users.length > 0) {
            for (const user of users) {
                if (user.conversations && user.conversations.length > 0) {
                    for (var i = user.conversations.length - 1; i >= 0; i--) {
                        if (!user.conversations[i].message.startsWith('/')) {
                            city = user.conversations[i].message;
                            break;
                        }
                    }
                }
                await this.sendWeatherUpdate(user.chatId, city);
            }
        }
    }

    async checkBlock(chatId: number): Promise<boolean> {
        const user = await this.userModel.findOne({ chatId }).exec();
        if (user?.isBlock) {
            return true;
        }
        return false;
    }
    async findAll(): Promise<TeleUser[]> {
        return await this.userModel.find().exec();
    }

    async blockChat(chatId: number): Promise<any> {
        const user = await this.userModel.findOne({ chatId }).exec();

        if (!user) {
            throw new NotFoundException("Some error occurred");
        }

        user.isBlock = !user.isBlock;

        return user.save();
    }

    async deleteUser(chatId: number): Promise<any> {
        const result = await this.userModel.findOneAndDelete(
            { chatId }
        ).exec();

        if (!result) {
            throw new NotFoundException("Some error occured");
        } else {
            return { success: true };
        }
        return result?.save();
    }
}

