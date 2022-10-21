const httpStatus = require('http-status');
const pick = require('../../../utils/pick');
const catchAsync = require('../../../utils/catchAsync');
const  whiteListService  = require('../services');

const WhiteList = require('../model')

const { sendResponse } = require('../../../utils/responseHandler');

const addWhiteList = catchAsync(async (req, res) => {
  console.log("req user",req.user);
  var ownerId = req.user._id
  const insertResult = await whiteListService.addWhiteList({...req.body,
    ownerId: ownerId,
  });

  if (insertResult) {
    sendResponse(res, httpStatus.OK, insertResult, null);
  } else {
    sendResponse(res, httpStatus.BAD_REQUEST, null, 'Not able to create whitelist, please try again');
  }
});
  
module.exports = addWhiteList
    