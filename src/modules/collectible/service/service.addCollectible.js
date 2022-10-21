const mongoose = require('mongoose');
const Collectible = require('../model');

/**
 * Create a Digital Art
 * @param {Object} collectibleData
 * @returns {Promise<Collectible>}
 */
const addCollectible = async (collectibleData) => {
  console.log("collectible Data", collectibleData)
  
  const addResult = await Collectible.create({ ...collectibleData,});

  return addResult;
};

module.exports = addCollectible