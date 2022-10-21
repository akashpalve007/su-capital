const httpStatus = require('http-status');
const pick = require('../../../utils/pick');
const catchAsync = require('../../../utils/catchAsync');
const  collectibleService  = require('../service');

const DigitalArt = require('../model')

const { sendResponse } = require('../../../utils/responseHandler');


const getCollectibleBySeriesId = catchAsync(async (req, res) => {
    const userId = req.user ? req.user.id : null
  
    const { start, limit, seriesId , collectionId} = await pick(req.body, ['start', 'limit', 'seriesId','collectionId']);
   
    const list = await collectibleService.getCollectiblebySeriesId(seriesId, collectionId,start, limit);
   
    if (list) {
      sendResponse(res, httpStatus.OK, list, null);
    } else {
      sendResponse(res, httpStatus.BAD_REQUEST, null, 'Not able to get Digital Art, please try again');
    }
  });

module.exports = getCollectibleBySeriesId

  