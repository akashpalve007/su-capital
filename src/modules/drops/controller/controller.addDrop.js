const httpStatus = require('http-status');
const pick = require('../../../utils/pick');
const catchAsync = require('../../../utils/catchAsync');
const  dropService  = require('../services');

const Drops = require('../model')

const { sendResponse } = require('../../../utils/responseHandler');

const addDrop = catchAsync(async (req, res) => {
  console.log("req user",req.user);
  var ownerId = req.user._id
  const insertResult = await dropService.addDrop({...req.body,
    ownerId: ownerId,
  });

  if (insertResult) {
    sendResponse(res, httpStatus.OK, insertResult, null);
  } else {
    sendResponse(res, httpStatus.BAD_REQUEST, null, 'Not able to create drop, please try again');
  }
});
  
module.exports = addDrop
    