const jdenticon = require('jdenticon');
const fs = require('fs');
const random = require('./random');
const utils = require('../utils');
const { createCanvas } = require('canvas');

const HUES = process.env.HUES !== undefined ? process.env.HUES : null;
const LIGHTNESS_COLOR_FROM =
  process.env.LIGHTNESS_COLOR_FROM !== undefined ? process.env.LIGHTNESS_COLOR_FROM : 0.4;
const LIGHTNESS_COLOR_TO =
  process.env.LIGHTNESS_COLOR_TO !== undefined ? process.env.LIGHTNESS_COLOR_TO : 0.8;
const LIGHTNESS_GRAYSCALE_FROM =
  process.env.LIGHTNESS_GRAYSCALE_FROM !== undefined ? process.env.LIGHTNESS_GRAYSCALE_FROM : 0.3;
const LIGHTNESS_GRAYSCALE_TO =
  process.env.LIGHTNESS_GRAYSCALE_TO !== undefined ? process.env.LIGHTNESS_GRAYSCALE_TO : 0.9;
const SATURATION_COLOR =
  process.env.SATURATION_COLOR !== undefined ? process.env.SATURATION_COLOR : 0.5;
const SATURATION_GRAYSCALE =
  process.env.SATURATION_GRAYSCALE !== undefined ? process.env.SATURATION_GRAYSCALE : 0;
const BACK_COLOR = process.env.BACK_COLOR !== undefined ? process.env.BACK_COLOR : '#00000000';

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

  // Custom identicon style
  jdenticon.configure({
    hues: [HUES],
    lightness: {
      color: [LIGHTNESS_COLOR_FROM, LIGHTNESS_COLOR_TO],
      grayscale: [LIGHTNESS_GRAYSCALE_FROM, LIGHTNESS_GRAYSCALE_TO],
    },
    saturation: {
      color: SATURATION_COLOR,
      grayscale: SATURATION_GRAYSCALE,
    },
    backColor: BACK_COLOR,
  });

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
