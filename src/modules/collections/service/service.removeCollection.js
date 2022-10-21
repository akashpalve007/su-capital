const mongoose = require('mongoose');
const Collections = require('../model');


const removeCollection = async (collectionId) => {
    let filterQuery = { active: true, _id: mongoose.Types.ObjectId(collectionId) }
    const removed = await Collections.updateOne(filterQuery, { $set: { active: false } })
    return removed
  };

module.exports = removeCollection
