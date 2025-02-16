<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.

## Project setup

1. Download the project using git clone url in your native machine.
2. Extract the file.
3. Create a .env file and provide all the keys.
  TELEGRAM_BOT_TOKEN = YOUR_TELEGRAM_BOT_KEY
  GOOGLE_CLIENT_ID = YOUR_GOOGLE_CLIENT_ID
  GOOGLE_CLIENT_SECRET = YOUR_CLIENT_SECRET_KEY
  GOOGLE_CALLBACK_URL = http://localhost:3000/auth/google/callback
  MONGO_URI = YOUR_MONGO_URI
   
4. Get the keys by following the steps
## Telegram bot key:
1. Goto telegram app on your system(application on your system)
2. Serch for BotFather(verified)
3. Send message /start
4. Send message /newbot
5. It will ask for name of bot set it as per your preference(should be unique)
6. You will get the link of telegram bot newly generate and the bot key.
7. Use this key in .env file.

## Get MongoDB uri:
1. Get the connection string from the mongodb compass or setup mongodb atlas. 

## Google client keys:
1. Goto https://console.cloud.google.com/
2. Click on the button present just after the Google cloud on the top left
3. Click on NEW PROJECT
4. Set the name of the project.
5. Click on create button.
6. Repeat step 2.
7. Click on API and Services button.
8. Goto the credentials on the left pane.
9. Click on the CONFIGURE CONCENT SCREEN
10. Select the user type to External and click on create button.
11. Give the name of the app and email and click on SAVE AND CONTINUE.
12. Again click on SAVE AND CONTINUE.
13. Click on Credentials on the left pane.
14. Click CREATE CREDENTIALS and then OAuth clientID.
15. Set the application type to web application.
16. In authorized javascript origin type http://localhost:3000 and in authorized redirect callback type http://localhost:3000/auth/google/callback
17. Click on CREATE. 
18. You will the the google client id and client secret key. paste it in your .env file.

5. Download the frontend app which is present in the repository by name Admin panel using git clone command.
```bash
$  git clone https://github.com/MAfzal8080/Admin-panel.git
```

6. In command prompt type
```bash
$ npm install
```
7. Do the above step for the nestjs as well.

## Compile and run the project

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Run tests

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```
## Telegram bot details:

To start the bot send message /start it will ask for our city. Give a valid city name and your will get the details of the weather. Keep in mind that the bot will update on the bases of last city you have searched for.

You can subscribe by sending the message /subscribe. For testing purpose by default it is set to 10 seconds so that you can result can be checked.

For weather update on any location you can message the name of the city in plane text.

## Admin panel:

On the admin panel user setting you can block the user by clicking on the block button and detete the user. 

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).
