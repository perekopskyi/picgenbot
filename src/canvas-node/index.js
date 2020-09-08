const jdenticon = require('jdenticon');
const fs = require('fs');
const random = require('./random');
const utils = require('../utils');
const { createCanvas } = require('canvas');

/**
 * Create a picture based on the entered text
 * @param {string} text
 */
exports.create = async (text) => {
  const size = 900;
  const randomColor = random.getColor();

  const canvas = createCanvas(size, size);
  const ctx = canvas.getContext('2d');

  ctx.font = '420px Impact';
  ctx.textBaseline = 'middle';

  jdenticon.drawIcon(ctx, text, size);

  ctx.shadowBlur = 50;
  ctx.shadowColor = randomColor;
  ctx.fillStyle = 'rgba(20, 20, 20, 0.8)';

  // Shorten the name to an abbreviation
  const abbreviation = utils.shortener(text);

  const textSize = ctx.measureText(abbreviation);
  ctx.fillText(abbreviation, size / 2 - textSize.width / 2, size / 2, size - 20);

  // save image
  const buf = canvas.toBuffer();
  return await fs.writeFileSync('images/newTitle.jpg', buf);
};
