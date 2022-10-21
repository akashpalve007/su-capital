const httpStatus = require('http-status');
const pick = require('../../../utils/pick');
const catchAsync = require('../../../utils/catchAsync');
const whitelistService = require('../services');
const Whitelist = require('../model')
const { sendResponse } = require('../../../utils/responseHandler');

const getWhitelistbyId = catchAsync(async (req, res) => {
    const { whitelistId } = await pick(req.params, ['whitelistId']);
    const list = await whitelistService.getWhiteListById(whitelistId);
    if (list) {
      sendResponse(res, httpStatus.OK, list, null);
    } else {
      sendResponse(res, httpStatus.BAD_REQUEST, null, 'Not able to add collection, please try again');
    }
  });

module.exports = getWhitelistbyId