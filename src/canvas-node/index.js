const random = require('./random');
const utils = require('../utils');

exports.canvas = (title) => {
  const fs = require('fs');
  const { createCanvas, loadImage } = require('canvas');

  const CANVAS_WIDTH = 400;
  const CANVAS_HEIGTH = 400;
  const randomColor = random.getColor();

  const canvas = createCanvas(CANVAS_WIDTH, CANVAS_HEIGTH);
  const ctx = canvas.getContext('2d');
  console.log('exports.canvas -> ctx', ctx);

  ctx.font = '250px Impact';
  ctx.textBaseline = 'middle';
  ctx.shadowBlur = 20;
  ctx.shadowColor = randomColor;

  // TODO настроить подгрузку новых файлов через сканирование папки images
  const namesOfImages = ['blue', 'gray', 'green', 'picture'];

  const randomImageName = namesOfImages[Math.floor(Math.random() * namesOfImages.length)];
  console.log('exports.canvas -> namesOfImages', namesOfImages);

  return loadImage(`images/${randomImageName}.jpg`).then((image) => {
    console.log('exports.canvas -> image', image);
    ctx.drawImage(image, 0, 0, image.width, image.height);

    ctx.rotate(random.getNumber(-0.2, 0.2));
    ctx.fillStyle = randomColor;

    // TODO сократить название до аббревиатуры
    const abbreviation = utils.shortener(title);

    const text = ctx.measureText(abbreviation);
    ctx.fillText(
      abbreviation,
      CANVAS_WIDTH / 2 - text.width / 2,
      CANVAS_HEIGTH / 2,
      CANVAS_HEIGTH - 20
    );

    // save image
    const buf = canvas.toBuffer();
    fs.writeFileSync('images/newTitle.jpg', buf);
  });
};
