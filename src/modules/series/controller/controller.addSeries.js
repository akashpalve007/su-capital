const httpStatus = require('http-status');
const pick = require('../../../utils/pick');
const catchAsync = require('../../../utils/catchAsync');
const seriesService = require('../service');
const Series = require('../model')
const { sendResponse } = require('../../../utils/responseHandler');
// const { updateSingleDropField } = require('../drops/service');

const addSeries = catchAsync(async (req, res) => {
  console.log("req user", req.user);
  var ownerId = req.user.id


  const insertResult = await seriesService.addSeries({...req.body,ownerId:ownerId, });

  if (insertResult) {
      sendResponse(res, httpStatus.OK, insertResult, null);
  } else {
      sendResponse(res, httpStatus.BAD_REQUEST, null, 'Not able to create collection, please try again');
  }
});
  
module.exports = addSeries
    