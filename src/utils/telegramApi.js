const FormData = require('form-data');
const fetch = require('node-fetch');
const fs = require('fs');
// https://api.telegram.org/bot<token>/METHOD_NAME

/**
 * Форма преобразует данные в FormData и отправляет на указанный url
 * @param {object} data
 * @param {string} url
 */
const sendFormData = (data, url) => {
  const formData = new FormData();
  for (const k in data) {
    formData.append(k, data[k]);
  }
  const request = { method: 'POST', body: formData };
  return fetch(url, request);
};

const imagePath = 'images/newTitle.jpg';

exports.setChatPhoto = async (apiBase, chatId) => {
  const url = `${apiBase}/setChatPhoto`;
  const data = {
    chat_id: chatId,
    photo: fs.createReadStream(imagePath),
  };

  await sendFormData(data, url)
    .then((response) => response.json())
    .then((result) => console.log('----', result))
    .catch((error) => console.warn(error));
};

/**
 * Send photo in chat
 * @param {string} apiBase telegram api
 * @param {string} chatId
 */
exports.sendPhoto = async (apiBase, chatId) => {
  const url = `${apiBase}/sendPhoto`;
  const data = {
    chat_id: chatId,
    photo: fs.createReadStream(imagePath),
  };

  return await sendFormData(data, url)
    .then((response) => response.json())
    .then((result) => {
      console.log('sendPhoto -> result', result);
      if (result.ok) {
        console.log('exports.sendPhoto -> result.result', result.result);
        return result.result;
      }
    })
    .catch((error) => console.warn(error));
};

exports.deleteMessage = async (apiBase, message_id, chat_id) => {
  const data = {
    chat_id,
    message_id,
  };

  const url = `${apiBase}/deleteMessage`;

  sendFormData(data, url)
    .then((response) => response.json())
    .then((result) => console.log('----', result))
    .catch((error) => console.warn(error));
};
