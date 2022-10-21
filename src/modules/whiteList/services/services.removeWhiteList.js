const mongoose = require('mongoose');
const Whitelist = require('../model');

const removeWhitelist = async (dropId) => {
    let filterQuery = { active: true, _id: mongoose.Types.ObjectId(dropId) }
    const removed = await Whitelist.updateOne(filterQuery, { $set: { active: false } })
    return removed
  };
  
module.exports = removeWhitelist