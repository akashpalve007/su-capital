const httpStatus = require('http-status');
const pick = require('../../../utils/pick');
const catchAsync = require('../../../utils/catchAsync');
const comicService = require('../service');
const Comic = require('../model')
const { sendResponse } = require('../../../utils/responseHandler');

const getComicListBySeriesId = catchAsync(async (req, res) => {
    const userId = req.user ? req.user.id : null
  
    const { start, limit, seriesId , collectionId} = await pick(req.body, ['start', 'limit', 'seriesId','collectionId']);
   
    const list = await comicService.getComicListBySeriesId(seriesId, collectionId,start, limit);
   
    if (list) {
      sendResponse(res, httpStatus.OK, list, null);
    } else {
      sendResponse(res, httpStatus.BAD_REQUEST, null, 'Not able to get Digital Art, please try again');
    }
  });

module.exports = getComicListBySeriesId