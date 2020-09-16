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
  if (!chat_id) {
    return;
  }

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
