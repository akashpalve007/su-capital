const httpStatus = require('http-status');
const pick = require('../../../utils/pick');
const catchAsync = require('../../../utils/catchAsync');
const WhiteList = require('../model')

const { sendResponse } = require('../../../utils/responseHandler');
const  whitelistService  = require('../services');

// const { updateSingleDropField } = require('../drops/service');

const removeWhitelist = catchAsync(async (req, res) => {
  const { id } = await pick(req.body, ['id']);
  const removed = await whitelistService.removeWhiteList(id);
  if (removed) {
    sendResponse(res, httpStatus.OK, { id }, null);
  } else {
    sendResponse(res, httpStatus.BAD_REQUEST, null, 'Not able to delete the Whitelist');
  }
});

module.exports = removeWhitelist
