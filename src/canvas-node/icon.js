const jdenticon = require('jdenticon');
const fs = require('fs');
const random = require('./random');
const utils = require('../utils');
const { createCanvas } = require('canvas');

exports.create = (value) => {
  const size = 900;
  const randomColor = random.getColor();

  const canvas = createCanvas(size, size);
  const ctx = canvas.getContext('2d');

  ctx.font = '400px Impact';
  ctx.textBaseline = 'middle';

  ctx.beginPath();
  ctx.rect(0, 0, size, size);
  ctx.fillStyle = 'rgb(255, 255, 255)';
  ctx.fill();

  jdenticon.drawIcon(ctx, value, size);

  ctx.shadowBlur = 50;
  ctx.shadowColor = randomColor;
  ctx.fillStyle = 'rgba(20, 20, 20, 0.9)';

  // сократить название до аббревиатуры
  const abbreviation = utils.shortener(value);

  const text = ctx.measureText(abbreviation);
  ctx.fillText(abbreviation, size / 2 - text.width / 2, size / 2, size - 20);

  // save image
  const buf = canvas.toBuffer();
  fs.writeFileSync('images/newTitle.jpg', buf);
  return;
};
