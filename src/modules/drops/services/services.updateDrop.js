const mongoose = require('mongoose');
const Drop = require('../model');

const updateDrop = async (dropId, reqBody) => {
    const collectibleSearchQuery = { active: true, _id: mongoose.Types.ObjectId(dropId) };
  
    const updateResult = await Drop.findOneAndUpdate(collectibleSearchQuery, reqBody, { new: true });
    return updateResult;
  };

module.exports = updateDrop