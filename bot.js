require('dotenv').config();
const { Telegraf } = require('telegraf');

const utils = require('./src/utils');
const api = require('./src/utils/telegramApi');
const canvas = require('./src/canvas-node');

// Устанавливаем токен, который выдавал нам бот
const TOKEN = process.env.BOT_TOKEN;
const telegraf = new Telegraf(TOKEN);
const API_BASE = `https://api.telegram.org/bot${TOKEN}`;

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

telegraf.use(async (ctx, next) => {
  const newChatTitle = ctx.message.new_chat_title;

  if (newChatTitle) {
    // TODO: вынести в отдельную функцию создание аватарки и вставить сюда
  }
  console.log('Response time: %sms', ctx.message);
});

// set New Titile
telegraf.command('newtitle', (ctx) => {
  const chatId = ctx.chat.id;
  const title = ctx.message.chat.title;

  if (title === undefined) {
    return ctx.reply(`Sorry, конечно, но это приватный чат.
Введи /help чтобы узнать, как правильно пользоваться`);
  }

  ctx.reply(`Ты просишь меня поменять название чата, но делаешь это без уважения...`);
  setTimeout(async () => {
    ctx.reply(`Ладно! Меняю.
Если что, раньше чат назывался ${utils.json(ctx.message.chat.title)}`);

    const newTitile = utils.createTitleFromCommand(ctx.message.text);

    ctx.setChatTitle(newTitile);

    // Set Chat Photo
    canvas.canvas(newTitile);
    api.setChatPhoto(API_BASE, chatId);
  }, 3000);
});

/**
 * Set New Title without jokes
 */
telegraf.command('nt', async (ctx) => {
  const chatId = ctx.chat.id;

  if (!utils.checkCommandArguments(ctx.message.text)) {
    return ctx.reply(`Введите команду и назватние нового чата в одном сообщении`);
  }

  const newTitile = utils.createTitleFromCommand(ctx.message.text);
  ctx.setChatTitle(newTitile);

  // Set Chat Photo
  // Step 1 - create picture and save into file
  canvas.canvas(newTitile);

  // TODO: Fix this kostyl please (remove sending photo into chat)
  // Step 2 - send photo in chat
  const sendingResult = await api.sendPhoto(API_BASE, chatId);
  console.log('sendingResult', sendingResult);

  const photoMessage = sendingResult.message_id;
  console.log(3);
  // Step 3 - set chat photo
  await api.setChatPhoto(API_BASE, chatId);
  console.log(4);

  // Step 4 - delete message with photo
  api.deleteMessage(API_BASE, photoMessage, chatId);
});

// Any text message
telegraf.on('text', (ctx) => {
  const chat = ctx.getChat().then((result) => console.log(result));
  console.log('ctx', chat);
  const chatId = ctx.chat.id;
  const message = ctx.update.message.text;

  ctx.reply(`Cам ты ${message}!`);
});

telegraf.launch();
