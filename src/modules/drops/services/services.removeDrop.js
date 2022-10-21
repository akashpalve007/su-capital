const mongoose = require('mongoose');
const Drop = require('../model');

const removeDrop = async (dropId) => {
    let filterQuery = { active: true, _id: mongoose.Types.ObjectId(dropId) }
    const removed = await Drop.updateOne(filterQuery, { $set: { active: false } })
    return removed
  };
  
module.exports = removeDrop