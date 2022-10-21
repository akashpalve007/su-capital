const httpStatus = require('http-status');
const pick = require('../../../utils/pick');
const catchAsync = require('../../../utils/catchAsync');
const  whiteListService  = require('../services');


const WhiteList = require('../model')
const { sendResponse } = require('../../../utils/responseHandler');

//public api 
const listAllWhiteLists = catchAsync(async (req, res) => {

    let options = req.body.options
    // const {start, limit} = options
    let filter = req.body.filter
    var result1 = {
      ...filter,
      active: true,
    };
   
  
    const list = await whiteListService.listWhiteList(filter, options);
      if (list) {
        sendResponse(res, httpStatus.OK, list, null);
      } else {
        sendResponse(res, httpStatus.BAD_REQUEST, null, 'Not able to get WhiteLists, please try again');
      }
  });

module.exports = listAllWhiteLists
