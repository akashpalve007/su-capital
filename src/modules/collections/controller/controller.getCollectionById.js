const httpStatus = require('http-status');
const pick = require('../../../utils/pick');
const catchAsync = require('../../../utils/catchAsync');
const  collectionService  = require('../service');


const Collection = require('../model')
const { sendResponse } = require('../../../utils/responseHandler');

const getCollectionbyId = catchAsync(async (req, res) => {
    const { collectionId } = await pick(req.params, ['collectionId']);
    const list = await collectionService.getCollectionbyId(collectionId);
    if (list) {
      sendResponse(res, httpStatus.OK, list, null);
    } else {
      sendResponse(res, httpStatus.BAD_REQUEST, null, 'Not able to add collection, please try again');
    }
  });

module.exports = getCollectionbyId
