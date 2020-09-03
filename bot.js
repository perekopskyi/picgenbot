// Устанавливаем токен, который выдавал нам бот
require('dotenv').config();
const token = process.env.BOT_TOKEN;
const { Telegraf } = require('telegraf');

const utils = require('./src/utils');
const api = require('./src/utils/telegramApi');
const canvas = require('./src/canvas-node');

const telegraf = new Telegraf(token);

const url = `https://api.telegram.org/bot${token}`;

telegraf.start((ctx) =>
  ctx.reply(`Привет, ${ctx.message.from.first_name}!
Введи /help чтобы узнать что я умею`)
);

telegraf.help((ctx) =>
  ctx.reply(`Я умею менять название чата и создавать для него новую картинку!

Для этого:
1. Добавь меня в чат и сделай админом
2. Введи команду /newtitle <новое название>`)
);

// middleware
telegraf.use(async (ctx, next) => {
  await next();
  // console.log('----CTX', ctx);
});

// set New Titile
telegraf.command('newtitle', async (ctx) => {
  const chatId = ctx.chat.id;

  ctx.reply(`Ты просишь меня поменять название чата, но делаешь это без уважения...`);
  setTimeout(async () => {
    ctx.reply(`Ладно! Меняю.
Если что, раньше чат назывался ${utils.json(ctx.message.chat.title)}`);

    const newTitile = utils.createTitleFromCommand(ctx.message.text);
    ctx.setChatTitle(newTitile);

    // Set Chat Photo
    const img = canvas.canvas(newTitile);
    img.then(() => chatPhoto.set(url, chatId));
  }, 3000);
});

// set New Titile without joke
telegraf.command('nt', async (ctx) => {
  const chatId = ctx.chat.id;

  const newTitile = utils.createTitleFromCommand(ctx.message.text);
  ctx.setChatTitle(newTitile);

  // Set Chat Photo
  const img = canvas.canvas(newTitile);
  img.then(() => api.setChatPhoto(url, chatId));
});

// Any text message
telegraf.on('text', async (ctx) => {
  const chatId = ctx.chat.id;
  const message = ctx.update.message.text;

  ctx.reply(`Cам ты ${message}!!
Введи /help чтобы узнать, что я умею`);

  ctx.reply(`Лови картинку :)`);

  const img = canvas.canvas(message);
  console.log('----img', img);
  img.then(api.sendPhoto(url, chatId));
});

telegraf.launch();
