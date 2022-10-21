const httpStatus = require('http-status');
const pick = require('../../../utils/pick');
const catchAsync = require('../../../utils/catchAsync');
const Collection = require('../model')
const { sendResponse } = require('../../../utils/responseHandler');
const  collectionService  = require('../service');

// const { updateSingleDropField } = require('../drops/service');

const updateCollection = catchAsync(async (req, res) => {
    const reqBody = req.body;
    const { collectionId } = await pick(req.params, ['collectionId']);
    const updatedCollection = await collectionService.updateCollection(collectionId, reqBody);
    if (updatedCollection) {
      sendResponse(res, httpStatus.OK, updatedCollection, null);
    } else {
      sendResponse(res, httpStatus.BAD_REQUEST, null, 'Collection not found !');
    }
  });

module.exports = updateCollection
