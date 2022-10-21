const httpStatus = require('http-status');
const pick = require('../../../utils/pick');
const catchAsync = require('../../../utils/catchAsync');
const DigitalArt = require('../model')

const { sendResponse } = require('../../../utils/responseHandler');
const  collectibleService  = require('../service');

// const { updateSingleDropField } = require('../drops/service');

const removeCollectible = catchAsync(async (req, res) => {
  const { id } = await pick(req.body, ['id']);
  const removed = await collectibleService.removeCollectible(id);
  if (removed) {
    sendResponse(res, httpStatus.OK, { id }, null);
  } else {
    sendResponse(res, httpStatus.BAD_REQUEST, null, 'Not able to delete the Digital Art');
  }
});

module.exports = removeCollectible
