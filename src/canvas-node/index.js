const jdenticon = require('jdenticon');
const fs = require('fs');
const random = require('./random');
const utils = require('../utils');
const { createCanvas } = require('canvas');

const randomColor = random.getColor();

const FILL_STYLE = process.env.FILL_STYLE || 'rgba(20, 20, 20, 0.8)';
const STROKE_STYLE = process.env.STROKE_STYLE || randomColor;
const SHADOW_COLOR = process.env.SHADOW_COLOR || randomColor;
const SHADOW_OFFSET_X = process.env.SHADOW_OFFSET_X || 2;
const SHADOW_OFFSET_Y = process.env.SHADOW_OFFSET_Y || 2;
const SHADOW_BLUR = process.env.SHADOW_BLUR || 40;

/**
 * Create a picture based on the entered text
 * @param {string} text
 */
exports.create = async (text) => {
  const size = 900; // size of canvas

  const canvas = createCanvas(size, size);
  const ctx = canvas.getContext('2d');

  jdenticon.drawIcon(ctx, text, size);

  ctx.font = '420px Impact';
  ctx.textBaseline = 'middle';
  ctx.shadowColor = SHADOW_COLOR;
  ctx.shadowOffsetX = SHADOW_OFFSET_X; // horizontal aside
  ctx.shadowOffsetY = SHADOW_OFFSET_Y; // vertical aside
  ctx.shadowBlur = SHADOW_BLUR; // размытие тени

  ctx.fillStyle = FILL_STYLE; // цвет заливки
  ctx.strokeStyle = STROKE_STYLE; // цвет обводки

  // Shorten the name to an abbreviation
  const abbreviation = utils.shortener(text);

  const textSize = ctx.measureText(abbreviation);
  ctx.fillText(abbreviation, size / 2 - textSize.width / 2, size / 2, size - 10);
  ctx.strokeText(abbreviation, size / 2 - textSize.width / 2, size / 2, size - 10);

  // save image
  const buf = canvas.toBuffer();
  return await fs.writeFileSync('images/newTitle.jpg', buf);
};
