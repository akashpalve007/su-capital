const httpStatus = require('http-status');
const pick = require('../../../utils/pick');
const catchAsync = require('../../../utils/catchAsync');
const DigitalArt = require('../model')

const { sendResponse } = require('../../../utils/responseHandler');
const  seriesService  = require('../service');

// const { updateSingleDropField } = require('../drops/service');

const updateSeries = catchAsync(async (req, res) => {
  const reqBody = req.body;
  const { seriesId } = await pick(req.params, ['seriesId']);
  const updatedSeries = await seriesService.updateSeries(seriesId, reqBody);
  if (updatedSeries) {
      sendResponse(res, httpStatus.OK, updatedSeries, null);
  } else {
      sendResponse(res, httpStatus.BAD_REQUEST, null, 'Series not found !');
  }
});

module.exports = updateSeries
