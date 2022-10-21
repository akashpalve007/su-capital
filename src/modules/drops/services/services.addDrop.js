const mongoose = require('mongoose');
const Drop = require('../model');

/**
 * Create a Drop
 * @param {Object} DropData
 * @returns {Promise<Drop>}
 */
const addDrop = async (DropData) => {
  console.log("Drop Data", DropData)
  
  const addResult = await Drop.create({ ...DropData,});

  return addResult;
};

module.exports = addDrop