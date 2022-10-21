const mongoose = require('mongoose');
const Comic = require('../model');

/**
 * Create a Comic
 * @param {Object} comicData
 * @returns {Promise<Comic>}
 */
const addComic = async (comicData) => {
  const addResult = await Comic.create({ ...comicData,});
  return addResult;
};
module.exports = addComic