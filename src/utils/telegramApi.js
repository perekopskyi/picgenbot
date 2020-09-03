const FormData = require('form-data');
const fetch = require('node-fetch');
const fs = require('fs');

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
// https://api.telegram.org/bot<token>/METHOD_NAME

const imagePath = 'images/newTitle.jpg';

exports.setChatPhoto = async (baseUrl, chatId) => {
  const data = {
    chat_id: chatId,
    photo: fs.createReadStream(imagePath),
  };

  const url = `${baseUrl}/setChatPhoto`;

  sendFormData(data, url)
    .then((response) => response.text())
    .then((result) => console.log('----', result))
    .catch((error) => console.warn(error));
};

exports.sendPhoto = async (baseUrl, chatId) => {
  const data = {
    chat_id: chatId,
    photo: fs.createReadStream(imagePath),
  };

  const url = `${baseUrl}/sendPhoto`;

  sendFormData(data, url)
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.warn(error));
};
