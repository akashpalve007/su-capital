const httpStatus = require('http-status');
const pick = require('../../../utils/pick');
const catchAsync = require('../../../utils/catchAsync');
const  collectionService  = require('../service');


const Collection = require('../model')
const { sendResponse } = require('../../../utils/responseHandler');

const listCollectionController = catchAsync(async (req, res) => {

    let options = req.body.options
    let filter = req.body.filter
    var result1 = {
      ...filter,
      active: true,
    };
  
    const list = await collectionService.getCollectionList(filter, options);
      if (list) {
        sendResponse(res, httpStatus.OK, list, null);
      } else {
        sendResponse(res, httpStatus.BAD_REQUEST, null, 'Not able to get Collections, please try again');
      }
  });

module.exports = listCollectionController
