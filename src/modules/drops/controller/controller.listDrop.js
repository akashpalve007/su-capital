const httpStatus = require('http-status');
const pick = require('../../../utils/pick');
const catchAsync = require('../../../utils/catchAsync');
const  dropService  = require('../services');


const Drop = require('../model')
const { sendResponse } = require('../../../utils/responseHandler');

//public api 
const listAllDrops = catchAsync(async (req, res) => {

    let options = req.body.options
    // const {start, limit} = options
    let filter = req.body.filter
    var result1 = {
      ...filter,
      active: true,
    };
   
  
    const list = await dropService.listDrop(filter, options);
      if (list) {
        sendResponse(res, httpStatus.OK, list, null);
      } else {
        sendResponse(res, httpStatus.BAD_REQUEST, null, 'Not able to get Drops, please try again');
      }
  });

module.exports = listAllDrops
