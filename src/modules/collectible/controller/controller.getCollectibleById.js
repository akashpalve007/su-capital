const httpStatus = require('http-status');
const pick = require('../../../utils/pick');
const catchAsync = require('../../../utils/catchAsync');
const  collectibleService  = require('../service');


const DigitalArt = require('../model')

const { sendResponse } = require('../../../utils/responseHandler'); 

const getCollectibleById = catchAsync(async (req, res) => {
  const { collectibleId } = await pick(req.params, ['collectibleId']);
  const userId = req.user ? req.user.id : null
  const list = await collectibleService.getCollectiblebyId(collectibleId, userId);
  if (list) {
    sendResponse(res, httpStatus.OK, list, null);
  } else {
    sendResponse(res, httpStatus.BAD_REQUEST, null, 'Not able to get Digital Art, please try again');
  }
});

module.exports = getCollectibleById
