const httpStatus = require('http-status');
const pick = require('../../../utils/pick');
const catchAsync = require('../../../utils/catchAsync');
const  collectionService  = require('../service');


const Collection = require('../model')
const { sendResponse } = require('../../../utils/responseHandler');


const removeCollection = catchAsync(async (req, res) => {
    const { id } = await pick(req.body, ['id']);
    const removed = await collectionService.removeCollection(id);
    if (removed) {
      sendResponse(res, httpStatus.OK, { id }, null);
    } else {
      sendResponse(res, httpStatus.BAD_REQUEST, null, 'Not able to delete collection');
    }
  });
  
module.exports = removeCollection
