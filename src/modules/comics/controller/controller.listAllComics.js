const httpStatus = require('http-status');
const pick = require('../../../utils/pick');
const catchAsync = require('../../../utils/catchAsync');
const comicService = require('../service');
const Comic = require('../model')
const { sendResponse } = require('../../../utils/responseHandler');

const listComic = catchAsync(async (req, res) => {

    let options = req.body.options
    let filter = req.body.filter
    var result1 = {
      ...filter,
      active:true,
    };
    const result = await Comic.paginate(result1, options); //.exec()
  
  
    console.log(result.page);
    try {
      if (result) {
        sendResponse(res, httpStatus.OK, result, null);
      }
    } catch (error) {
      sendResponse(res, httpStatus.BAD_REQUEST, null, 'Cannot get comics data');
      console.log(error);
    }
  });

  module.exports = listComic