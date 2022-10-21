const mongoose = require('mongoose');
const Comic = require('../model');

const updateComic = async (comicId, reqBody) => {
  const comicSearchQuery = { active: true, _id: mongoose.Types.ObjectId(comicId) };

  const updateResult = await Comic.findOneAndUpdate(comicSearchQuery, reqBody, { new: true });
  return updateResult;
};


module.exports = updateComic