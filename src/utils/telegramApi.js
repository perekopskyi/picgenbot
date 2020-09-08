const FormData = require('form-data');
const fetch = require('node-fetch');
const fs = require('fs');
// https://api.telegram.org/bot<token>/METHOD_NAME

const imagePath = 'images/newTitle.jpg';

/**
 * Form converts the data to FormData and sends it to the specified url
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

/**
 *
 * @param {string} apiBase url
 * @param {string | number} chat_id
 */
exports.setChatPhoto = async (apiBase, chat_id) => {
  const url = `${apiBase}/setChatPhoto`;
  const data = {
    chat_id,
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
 * @param {string} chat_id
 */
exports.sendPhoto = async (apiBase, chat_id) => {
  const url = `${apiBase}/sendPhoto`;
  const data = {
    chat_id,
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

/**
 * Delete message from chat
 * @param {string} apiBase
 * @param {string} message_id
 * @param {string | number} chat_id
 */
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
