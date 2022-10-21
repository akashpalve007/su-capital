const mongoose = require('mongoose');
const Collectible = require('../model');

const removeCollectible = async (collectibleId) => {
    let filterQuery = { active: true, _id: mongoose.Types.ObjectId(collectibleId) }
    const removed = await Collectible.updateOne(filterQuery, { $set: { active: false } })
    return removed
  };
  
module.exports = removeCollectible