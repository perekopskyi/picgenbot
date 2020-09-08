# Picture Generator bot

PicGenBot is designed to create a unique picture for your chats

### Features

- Can change the name of the chat
- Generate a unique picture based on the name of the chat
- Set picture as Chat Photo
- Track the chat name and change the picture when it was changed

### Tech

Bot uses a number of open source projects to work properly:

- [node.js] - evented I/O for the backend
- [telegraf.js] - Telegraf: Modern Telegram Bot Framework for Node.js
- [jdenticon] - Open source library for generating identicons.

### Installation

Bot requires [Node.js] v12+ to run.

Install the dependencies and devDependencies and start the bot.

```sh
$ cd picgenbot
$ npm install -d
$ npm run start
```

Environments place in `.env` file

```sh
BOT_TOKEN
PREFIX
```

- BOT_TOKEN - Each bot is given a unique authentication token [when it is created](https://core.telegram.org/bots#6-botfather). The token looks something like 123456:ABC-DEF1234ghIkl-zyx57W2v1u123ew11
- PREFIX - The string to be excluded when generating the abbreviation for your chat

### Development

Want to contribute? Great!
We will be glad to develop this bot.

### Docker

PicGenBot is very easy to install and deploy in a Docker container.

### Todos

- Write Tests
- Add New Features

## License

MIT

**Free Software, Hell Yeah!**

[//]: # "These are reference links used in the body of this note and get stripped out when the markdown processor does its job. There is no need to format nicely because it shouldn't be seen. Thanks SO - http://stackoverflow.com/questions/4823468/store-comments-in-markdown-syntax"
[node.js]: http://nodejs.org
[telegraf.js]: https://telegraf.js.org/
[jdenticon]: https://jdenticon.com/
