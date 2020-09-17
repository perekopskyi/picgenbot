const jdenticon = require('jdenticon');
const fs = require('fs');
const random = require('./random');
const utils = require('../utils');
const { createCanvas } = require('canvas');

const randomColor = random.getColor();

const parseEnvArray = (string) => {
  return string
    .substring(1, string.length - 1)
    .split(',')
    .map((item) => Number(item));
};

const CANVAS_SIZE = process.env.CANVAS_SIZE || 600;
const FILL_STYLE = process.env.FILL_STYLE || 'rgba(20, 20, 20, 0.8)';
const STROKE_STYLE = process.env.STROKE_STYLE || null;
const SHADOW_COLOR = process.env.SHADOW_COLOR || randomColor;
const SHADOW_OFFSET_X = process.env.SHADOW_OFFSET_X || 2;
const SHADOW_OFFSET_Y = process.env.SHADOW_OFFSET_Y || 2;
const SHADOW_BLUR = process.env.SHADOW_BLUR || 40;

const HUES = parseEnvArray(process.env.HUES) || [null];
const LIGHTNESS_COLOR = parseEnvArray(process.env.LIGHTNESS_COLOR) || [0.4, 0.8];
const LIGHTNESS_GRAYSCALE = parseEnvArray(process.env.LIGHTNESS_GRAYSCALE) || [0.3, 0.9];
const SATURATION_COLOR = process.env.SATURATION_COLOR || 0.5;
const SATURATION_GRAYSCALE = process.env.SATURATION_GRAYSCALE || 0;
const BACK_COLOR = process.env.BACK_COLOR || '#00000000';

/**
 * Create a picture based on the entered text
 * @param {string} text
 */
exports.create = async (text) => {
  const canvas = createCanvas(CANVAS_SIZE, CANVAS_SIZE);
  const ctx = canvas.getContext('2d');

  // Custom identicon style
  jdenticon.configure({
    hues: HUES,
    lightness: {
      color: LIGHTNESS_COLOR,
      grayscale: LIGHTNESS_GRAYSCALE,
    },
    saturation: {
      color: SATURATION_COLOR,
      grayscale: SATURATION_GRAYSCALE,
    },
    backColor: BACK_COLOR,
  });

  jdenticon.drawIcon(ctx, text, CANVAS_SIZE);

  ctx.font = `${CANVAS_SIZE / 2 - 20}px Impact`;
  ctx.textBaseline = 'middle';
  ctx.shadowColor = SHADOW_COLOR;
  ctx.shadowOffsetX = SHADOW_OFFSET_X;
  ctx.shadowOffsetY = SHADOW_OFFSET_Y;
  ctx.shadowBlur = SHADOW_BLUR;
  ctx.fillStyle = FILL_STYLE;
  ctx.strokeStyle = STROKE_STYLE;

  // Shorten the name to an abbreviation
  const abbreviation = utils.shortener(text);

  const textSize = ctx.measureText(abbreviation);
  ctx.fillText(
    abbreviation,
    CANVAS_SIZE / 2 - textSize.width / 2,
    CANVAS_SIZE / 2,
    CANVAS_SIZE - 10
  );
  ctx.strokeText(
    abbreviation,
    CANVAS_SIZE / 2 - textSize.width / 2,
    CANVAS_SIZE / 2,
    CANVAS_SIZE - 10
  );

  // save image
  const buf = canvas.toBuffer();
  return await fs.writeFileSync('images/newTitle.jpg', buf);
};
