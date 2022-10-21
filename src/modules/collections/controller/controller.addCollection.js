const httpStatus = require('http-status');
const pick = require('../../../utils/pick');
const catchAsync = require('../../../utils/catchAsync');
const  collectionService  = require('../service');

const Collection = require('../model')
const { sendResponse } = require('../../../utils/responseHandler');

const addCollection = catchAsync(async (req, res) => {
    console.log("req user", req.user);
    var ownerId = req.user.id
    var ownerName = req.user?.name
    console.log("owner name", ownerName)
    const collectionData = req.body
    collectionData.ownerName =  ownerName
    collectionData.ownerId = ownerId
 
    const insertResult = await collectionService.addCollection(collectionData);
  
    if (insertResult) {
      sendResponse(res, httpStatus.OK, insertResult, null);
    } else {
      sendResponse(res, httpStatus.BAD_REQUEST, null, 'Not able to create collection, please try again');
    }
  });
  
module.exports = addCollection
    