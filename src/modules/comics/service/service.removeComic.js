const mongoose = require('mongoose');
const Comic = require('../model');


const removeComic = async (comicId) => {
  let filterQuery = { active: true, _id: mongoose.Types.ObjectId(comicId) }
  const removed = await Comic.updateOne(filterQuery, { $set: { active: false } })
  return removed
};
  
module.exports = removeComic