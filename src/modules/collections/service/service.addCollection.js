const mongoose = require('mongoose');
const Collections = require('../model');


/**
 * Create a Collection
 * @param {Object} collectionData
 * @returns {Promise<Collection>}
 */
const addCollection = async (collectionData) => {
    console.log("collection Data", collectionData)
    // fetch drop data and insert contract address
    // const dropData = await DropModel.findOne({ _id: mongoose.Types.ObjectId(auctionData.dropId), active: true })
    const addResult = await Collections.create({ ...collectionData, });

    return addResult;
};

module.exports = addCollection
