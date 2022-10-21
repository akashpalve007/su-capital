const httpStatus = require('http-status');
const pick = require('../../../utils/pick');
const catchAsync = require('../../../utils/catchAsync');
const seriesService = require('../service');
const Series = require('../model')
const { sendResponse } = require('../../../utils/responseHandler');
// const { updateSingleDropField } = require('../drops/service');

// get series by collection Id
const getSeriesByCollectionId = catchAsync(async (req, res) =>{
  const { start, limit, collectionId } = await pick(req.body, ['start', 'limit', 'collectionId']);
  const list = await seriesService.getSeriesListByCollectionId(collectionId, start, limit);
  if (list) {
    sendResponse(res, httpStatus.OK, list, null);
  } else {
    sendResponse(res, httpStatus.BAD_REQUEST, null, 'Not able to get series, please try again');
  }
}) 

module.exports = getSeriesByCollectionId
