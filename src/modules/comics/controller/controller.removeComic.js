const httpStatus = require('http-status');
const pick = require('../../../utils/pick');
const catchAsync = require('../../../utils/catchAsync');
const comicService = require('../service');
const Comic = require('../model')
const { sendResponse } = require('../../../utils/responseHandler');


const removeComic = catchAsync(async (req, res) => {
    const { id } = await pick(req.body, ['id']);
    const removed = await comicService.removeComic(id);
    if (removed) {
      sendResponse(res, httpStatus.OK, { id }, null);
    } else {
      sendResponse(res, httpStatus.BAD_REQUEST, null, 'Not able to delete the Comic');
    }
  });

module.exports = removeComic