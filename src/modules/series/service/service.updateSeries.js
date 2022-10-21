const mongoose = require('mongoose');
const Series = require('../model');

const updateSeries= async (seriesId, reqBody) => {
  const seriesSearchQuery = { active: true, _id: mongoose.Types.ObjectId(seriesId) };

  const updateResult = await Series.findOneAndUpdate(seriesSearchQuery, reqBody, { new: true });
  return updateResult;
};


module.exports = updateSeries