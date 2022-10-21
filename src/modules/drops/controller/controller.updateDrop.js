const httpStatus = require('http-status');
const pick = require('../../../utils/pick');
const catchAsync = require('../../../utils/catchAsync');
const Drop = require('../model')

const { sendResponse } = require('../../../utils/responseHandler');
const  dropService  = require('../services');

// const { updateSingleDropField } = require('../drops/service');

const updateDrop = catchAsync(async (req, res) => {
  const reqBody = req.body;
  const { dropId } = await pick(req.params, ['dropId']);
  const updatedDrop = await dropService.updateDrop(dropId, reqBody);
  if (updatedDrop) {
    sendResponse(res, httpStatus.OK, updatedDrop, null);
  } else {
    sendResponse(res, httpStatus.BAD_REQUEST, null, 'Drop not found !');
  }
});

module.exports = updateDrop
