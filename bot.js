require('dotenv').config();
const { Telegraf } = require('telegraf');

const bot = new Telegraf(process.env.BOT_TOKEN);

bot.start((ctx) =>
  ctx.reply(`
  Привет, ${ctx.message.from.first_name}!
Введи /help чтобы узнать что я умею`)
);

bot.help((ctx) =>
  ctx.reply(`
❓ Отвечаю на вопросы "где?", "когда?", "кто?"
или отправь мне стикер 😉`)
);

bot.on('sticker', (ctx) => ctx.reply('👍 Каеф)'));

bot.hears('hi', (ctx) => ctx.reply('Hey there'));
bot.hears('где?', (ctx) =>
  ctx.reply(`🏖 Вейк Парк "Голубое Озеро" https://goo.gl/maps/2kgUQqjBd5VQVo537`)
);
bot.hears('когда?', (ctx) => ctx.reply('📆 Суббота, 27 июня 2020'));
bot.hears('кто?', (ctx) => ctx.reply('Именинница 🥳, ты и еще несколько друзей 😁'));

bot.launch();
