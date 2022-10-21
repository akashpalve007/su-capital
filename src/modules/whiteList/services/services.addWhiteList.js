const mongoose = require('mongoose');
const WhiteList = require('../model');

/**
 * Create a WHiteList
 * @param {Object} WhiteListData
 * @returns {Promise<WhiteList>}
 */
const addWhiteList = async (WhiteListData) => {
  console.log("WhiteList Data", WhiteListData)
  
  const addResult = await WhiteList.create({ ...WhiteListData,});

  return addResult;
};

module.exports = addWhiteList