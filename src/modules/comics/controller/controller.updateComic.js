const httpStatus = require('http-status');
const pick = require('../../../utils/pick');
const catchAsync = require('../../../utils/catchAsync');
const comicService = require('../service');
const Comic = require('../model')
const { sendResponse } = require('../../../utils/responseHandler');

const updateComic = catchAsync(async (req, res) => {
    const reqBody = req.body;
    const { comicId } = await pick(req.params, ['comicId']);
    const updatedComic = await comicService.updateComic(comicId, reqBody);
    if (updatedComic) {
      sendResponse(res, httpStatus.OK, updatedComic, null);
    } else {
      sendResponse(res, httpStatus.BAD_REQUEST, null, 'Comic not found !');
    }
  });

  module.exports = updateComic