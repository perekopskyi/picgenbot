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

| OPTION                   | DEFAULT VALUE | DESCRIPTION                                                                                                                                                                                                               |
| ------------------------ | ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| BOT_TOKEN                | -             | Each bot is given a unique authentication token [when it is created](https://core.telegram.org/bots#6-botfather). The token looks something like 123456:ABC-DEF1234ghIkl-zyx57W2v1u123ew11                                |
| PREFIX                   | -             | The string to be excluded when generating the abbreviation for your chat                                                                                                                                                  |
| HUES                     | null          | Limits the possible hues in generated icons. The hues are specified as an array of hues in degrees. If the option is omitted or an empty array is specified, all hues are allowed. [Custom identicon style]               |
| LIGHTNESS_COLOR_FROM     | 0.4           | Specifies the lightness range of colored shapes of an icon. The range is expressed as an array containing two numbers, representing the minimum and maximum lightness in the range [0.0, 1.0]. [Custom identicon style]   |
| LIGHTNESS_COLOR_TO       | 0.8           | Specifies the lightness range of colored shapes of an icon. The range is expressed as an array containing two numbers, representing the minimum and maximum lightness in the range [0.0, 1.0]. [Custom identicon style]   |
| LIGHTNESS_GRAYSCALE_FROM | 0.3           | Specifies the lightness range of grayscale shapes of an icon. The range is expressed as an array containing two numbers, representing the minimum and maximum lightness in the range [0.0, 1.0]. [Custom identicon style] |
| LIGHTNESS_GRAYSCALE_TO   | 0.9           | Specifies the lightness range of grayscale shapes of an icon. The range is expressed as an array containing two numbers, representing the minimum and maximum lightness in the range [0.0, 1.0]. [Custom identicon style] |
| SATURATION_COLOR         | 0.5           | Specifies the saturation of the originally colored shapes of an icon. The saturation is expressed as a number in the range [0.0, 1.0]. [Custom identicon style]                                                           |
| SATURATION_GRAYSCALE     | 0             | Specifies the saturation of the originally grayscale shapes of an icon. The saturation is expressed as a number in the range [0.0, 1.0]. [Custom identicon style]                                                         |
| BACK_COLOR               | #00000000     | Specifies the background color to be rendered behind the icon. Supported syntaxes are #rgb, #rgba, #rrggbb and #rrggbbaa [Custom identicon style]                                                                         |

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
[custom identicon style]: https://jdenticon.com/icon-designer.html?config=343229ff11683213274c255a
