const httpStatus = require('http-status');
const pick = require('../../../utils/pick');
const catchAsync = require('../../../utils/catchAsync');
const Whitelist = require('../model')
const { sendResponse } = require('../../../utils/responseHandler');
const  whitelistService  = require('../services');

// const { updateSingleDropField } = require('../drops/service');

const updateWhitelist = catchAsync(async (req, res) => {
    const reqBody = req.body;
    const { whitelistId } = await pick(req.params, ['whitelistId']);
    const updatedWhitelist = await whitelistService.updateWhiteList(whitelistId, reqBody);
    if (updatedWhitelist) {
      sendResponse(res, httpStatus.OK, updatedWhitelist, null);
    } else {
      sendResponse(res, httpStatus.BAD_REQUEST, null, 'Whitelist not found !');
    }
  });

module.exports = updateWhitelist
