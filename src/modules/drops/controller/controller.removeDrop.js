const httpStatus = require('http-status');
const pick = require('../../../utils/pick');
const catchAsync = require('../../../utils/catchAsync');
const Drops = require('../model')

const { sendResponse } = require('../../../utils/responseHandler');
const  dropService  = require('../services');

// const { updateSingleDropField } = require('../drops/service');

const removeDrop = catchAsync(async (req, res) => {
  const { id } = await pick(req.body, ['id']);
  const removed = await dropService.removeDrop(id);
  if (removed) {
    sendResponse(res, httpStatus.OK, { id }, null);
  } else {
    sendResponse(res, httpStatus.BAD_REQUEST, null, 'Not able to delete the Drop');
  }
});

module.exports = removeDrop
