const canvas = require('../canvas-node');
const api = require('./telegramApi');
const API_BASE = `https://api.telegram.org/bot${process.env.BOT_TOKEN}`;

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
exports.createTitleFromCommand = (command) => {
  return command.split(' ').slice(1).join(' ');
};

/**
 * Shortens the chat name to 2 letters excluding the constant prefix
 * @param {string} string
 */
exports.shortener = (string) => {
  const prefix = process.env.PREFIX;
  let titleName = '';

  const havePrefix = string.toUpperCase().includes(prefix.toUpperCase());
  if (havePrefix) {
    console.log(true);
    titleName = string.substring(5);
  } else {
    console.log(false);
    titleName = string;
  }

  const arrayFromString = titleName.trim().split(' ');

  let arrayOfLetters = arrayFromString.map((item) => {
    return item.charAt(0).toUpperCase();
  });

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
  const photoMessage = sendingResult.message_id;

  // Step 3 - set chat photo
  await api.setChatPhoto(API_BASE, chatId);

  // Step 4 - delete message with photo
  api.deleteMessage(API_BASE, photoMessage, chatId);
};
