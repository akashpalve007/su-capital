const mongoose = require('mongoose');
const Series = require('../model');


const removeSeries= async (seriesId) => {
  let filterQuery = { active: true, _id: mongoose.Types.ObjectId(seriesId) }
  const removed = await Series.updateOne(filterQuery, { $set: { active: false } })
  return removed
};
  
module.exports = removeSeries