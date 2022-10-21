const httpStatus = require('http-status');
const pick = require('../../../utils/pick');
const catchAsync = require('../../../utils/catchAsync');
const comicService = require('../service');
const Comic = require('../model')
const { sendResponse } = require('../../../utils/responseHandler');

const getComicbyId = catchAsync(async (req, res) => {
    const { comicId } = await pick(req.params, ['comicId']);
    const list = await comicService.getComicbyId(comicId);
    if (list) {
      sendResponse(res, httpStatus.OK, list, null);
    } else {
      sendResponse(res, httpStatus.BAD_REQUEST, null, 'Not able to add collection, please try again');
    }
  });

module.exports = getComicbyId