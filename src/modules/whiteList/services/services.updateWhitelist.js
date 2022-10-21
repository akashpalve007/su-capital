const mongoose = require('mongoose');
const Whitelist = require('../model');

const updateWhitelist = async (whitelistId, reqBody) => {
    const whitelistSearchQuery = { active: true, _id: mongoose.Types.ObjectId(whitelistId) };
  
    const updateResult = await Whitelist.findOneAndUpdate(whitelistSearchQuery, reqBody, { new: true });
    return updateResult;
  };

module.exports = updateWhitelist
