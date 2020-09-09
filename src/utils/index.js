const canvas = require('../canvas-node');
const api = require('./telegramApi');
const API_BASE = `https://api.telegram.org/bot${process.env.BOT_TOKEN}`;

/**
 * Checking private chat. Return true if chat public
 * @param {object} ctx
 */
exports.getChatType = (ctx) => {
  const {
    message: {
      chat: { title, type },
    },
  } = ctx;
  return title || type !== 'private';
};

/**
 * Extracts the command from the message and returns a clean message
 * @param {string} command
 */
exports.checkCommandArguments = (command) => {
  return command.trim().split(' ').length > 1;
};

/**
 * Retrieves the name attached to the command
 * @param {string} command message from telegram api
 */
exports.createTitleFromCommand = (ctx) => {
  const entities = ctx.message.entities;
  console.log('exports.createTitleFromCommand -> entities', entities);
  const command = ctx.message.text;
  console.log('exports.createTitleFromCommand -> command', command);

  return command.split(' ').slice(1).join(' ');
};

/**
 * Shortens the chat name to 2 letters excluding the constant prefix
 * @param {string} string
 */
exports.shortener = (string) => {
  console.log('exports.shortener -> string', string);
  const prefix = process.env.PREFIX || null;

  const havePrefix = prefix && string.toUpperCase().includes(prefix.toUpperCase());
  const titleName = havePrefix ? string.substring(prefix.length) : string;

  const arrayFromString = titleName.trim().split(' ');

  let arrayOfLetters = arrayFromString.map((item) => item.charAt(0).toUpperCase());

  if (arrayOfLetters.length > 2) {
    arrayOfLetters = arrayOfLetters.slice(0, 2);
  }

  return arrayOfLetters.join('');
};

/**
 * Creates a picture and sets it as a chat photo
 * @param {*} chatId
 * @param {string} title of chat
 */
exports.chatPhotoHendler = async (chatId, title) => {
  // Step 1 - create picture and save into file
  canvas.create(title);

  // TODO: Fix this kostyl please. Remove sending photo into chat (step 2 & 4)
  // Step 2 - send photo in chat
  const sendingResult = await api.sendPhoto(API_BASE, chatId);
  if (sendingResult === undefined) {
    return;
  }
  const photoMessage = sendingResult.message_id;

  // Step 3 - set chat photo
  await api.setChatPhoto(API_BASE, chatId);

  // Step 4 - delete message with photo
  api.deleteMessage(API_BASE, photoMessage, chatId);
};
