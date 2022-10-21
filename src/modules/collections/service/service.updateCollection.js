const mongoose = require('mongoose');
const Collections = require('../model');

const updateCollection = async (collectionId, reqBody) => {
    const collectionSearchQuery = { active: true, _id: mongoose.Types.ObjectId(collectionId) };
  
    const updateResult = await Collections.findOneAndUpdate(collectionSearchQuery, reqBody, { new: true });
    return updateResult;
  };

module.exports = updateCollection
