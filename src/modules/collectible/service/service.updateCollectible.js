const mongoose = require('mongoose');
const Collectible = require('../model');

const updateCollectible = async (collectibleId, reqBody) => {
    const collectibleSearchQuery = { active: true, _id: mongoose.Types.ObjectId(collectibleId) };
  
    const updateResult = await Collectible.findOneAndUpdate(collectibleSearchQuery, reqBody, { new: true });
    return updateResult;
  };

module.exports = updateCollectible