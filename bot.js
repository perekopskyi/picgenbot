require('dotenv').config();
const { Telegraf } = require('telegraf');
const telegraf = new Telegraf(process.env.BOT_TOKEN);

const utils = require('./src/utils');

/**
 * Handler for /start command.
 */
telegraf.start((ctx) =>
  ctx.reply(`Привет, ${ctx.message.from.first_name}!
Введи /help чтобы узнать что я умею`)
);

/**
 * Handler for /help command.
 */
telegraf.help((ctx) =>
  ctx.reply(`Я умею создавать уникальную картинку для чата!

Для этого:
1. Добавь меня в чат и сделай админом
2. Введи команду /newtitle <новое название чата>. Остальное я сделаю сам`)
);

/**
 * Middleware that keeps track of the chat name change
 */
telegraf.use(async (ctx, next) => {
  try {
    if (ctx.update.channel_post && ctx.update.channel_post.new_chat_title) {
      //  It's new title for chanel
      const chatId = ctx.update.channel_post.chat.id;
      const newTitle = ctx.update.channel_post.new_chat_title;
      utils.chatPhotoHendler(chatId, newTitle);
    }

    if (ctx.message) {
      // It's chat! Go change chat photo
      const chatId = ctx.message.chat.id;
      const newChatTitle = ctx.message.new_chat_title;

      if (newChatTitle) {
        // Set Chat Photo
        utils.chatPhotoHendler(chatId, newChatTitle);
      }
    }
  } catch (error) {
    console.log('err----', error);
  }
  await next();
});

/**
 * Handler for /newtitle command.
 */
telegraf.command('newtitle', (ctx) => {
  try {
    const title = ctx.message.chat.title;

    if (title === undefined) {
      return ctx.reply(`Sorry, конечно, но это приватный чат.
Введи /help чтобы узнать, как правильно пользоваться`);
    }

    if (!utils.checkCommandArguments(ctx.message.text)) {
      return ctx.reply(
        `Введите команду и назватние нового чата в одном сообщении. Или измени название чата в настройках`
      );
    }

    ctx.reply(`Ты просишь меня поменять название чата, но делаешь это без уважения...`);
    setTimeout(async () => {
      ctx.reply(`It's joke! Меняю 😁`);

      const newTitile = utils.createTitleFromCommand(ctx.message.text);
      ctx.setChatTitle(newTitile);
    }, 3000);
  } catch (error) {
    console.log('err----', error);
  }
});

/**
 * Handler for /nt command (/newtitle command without jokes).
 */
telegraf.command('nt', async (ctx) => {
  try {
    if (!utils.checkCommandArguments(ctx.message.text)) {
      return ctx.reply(`Введите команду и назватние нового чата в одном сообщении`);
    }

    if (!utils.getChatType(ctx)) {
      return ctx.reply(`Sorry, конечно, но это приватный чат.
      Введи /help чтобы узнать, как правильно пользоваться`);
    }

    const newTitile = utils.createTitleFromCommand(ctx);
    ctx.setChatTitle(newTitile);
  } catch (error) {
    console.log('/nt error: ', error);
  }
});

telegraf.launch();
