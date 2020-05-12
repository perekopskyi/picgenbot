require('dotenv').config();
const { Telegraf } = require('telegraf');

const bot = new Telegraf(process.env.BOT_TOKEN);
bot.start((ctx) =>
  ctx.reply(`Привет, ${ctx.message.from.first_name} ! Введи /help чтобы узнать что я умею`)
);
bot.help((ctx) => ctx.reply('Отправь мне стикер'));
bot.on('sticker', (ctx) => ctx.reply('👍 Каеф)'));
bot.hears('hi', (ctx) => ctx.reply('Hey there'));
bot.launch();
