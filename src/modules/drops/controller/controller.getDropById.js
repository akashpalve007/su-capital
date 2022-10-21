const httpStatus = require('http-status');
const pick = require('../../../utils/pick');
const catchAsync = require('../../../utils/catchAsync');
const  dropService  = require('../services');


const Drop = require('../model')
const { sendResponse } = require('../../../utils/responseHandler');

const getDropbyId = catchAsync(async (req, res) => {
    const { dropId } = await pick(req.params, ['dropId']);
    const list = await dropService.getDropById(dropId);
    if (list) {
      sendResponse(res, httpStatus.OK, list, null);
    } else {
      sendResponse(res, httpStatus.BAD_REQUEST, null, 'Not able to add collection, please try again');
    }
  });

module.exports = getDropbyId
