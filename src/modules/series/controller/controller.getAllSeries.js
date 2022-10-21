const httpStatus = require('http-status');
const pick = require('../../../utils/pick');
const catchAsync = require('../../../utils/catchAsync');
const Series = require('../model')

const { sendResponse } = require('../../../utils/responseHandler');
const  seriesService  = require('../service');
//get all series
const getAllSeries = catchAsync(async (req, res) => {

  let options = req.body.options
  let filter = req.body.filter
  var result1 = {
      ...filter,
      active: true,
  };
  const result = await Series.paginate(result1, options); //.exec()
  console.log(result.page);
  try {
      if (result) {
          sendResponse(res, httpStatus.OK, result, null);
      }
  } catch (error) {
      sendResponse(res, httpStatus.BAD_REQUEST, null, 'cannot getting user');
      console.log(error);
  }
});

module.exports = getAllSeries
