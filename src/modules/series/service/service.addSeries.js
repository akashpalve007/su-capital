const mongoose = require('mongoose');
const Series = require('../model');

const addSeries= async (seriesData) => {
  console.log("series Data", seriesData)
    // fetch drop data and insert contract address
    // const dropData = await DropModel.findOne({ _id: mongoose.Types.ObjectId(auctionData.dropId), active: true })
    const addResult = await Series.create({ ...seriesData,});
  
    return addResult;
  };
module.exports = addSeries