const httpStatus = require('http-status');
const pick = require('../../../utils/pick');
const catchAsync = require('../../../utils/catchAsync');
const DigitalArt = require('../model')

const { sendResponse } = require('../../../utils/responseHandler');
const  collectibleService  = require('../service');

// const { updateSingleDropField } = require('../drops/service');

const updateCollectible = catchAsync(async (req, res) => {
  const reqBody = req.body;
  const { collectibleId } = await pick(req.params, ['collectibleId']);
  const updatedDigitalArt = await collectibleService.updateCollectible(collectibleId, reqBody);
  if (updatedDigitalArt) {
    sendResponse(res, httpStatus.OK, updatedDigitalArt, null);
  } else {
    sendResponse(res, httpStatus.BAD_REQUEST, null, 'Digital Art not found !');
  }
});

module.exports = updateCollectible
