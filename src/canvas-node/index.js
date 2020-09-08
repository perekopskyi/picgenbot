const icon = require('./icon');
/**
 *
 * @param {string} title
 */

exports.canvas = async (title) => {
  return await icon.create(title);
};
