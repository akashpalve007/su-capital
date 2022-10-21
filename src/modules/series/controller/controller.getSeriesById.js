const httpStatus = require('http-status');
const pick = require('../../../utils/pick');
const catchAsync = require('../../../utils/catchAsync');
const seriesService = require('../service');
const Series = require('../model')
const { sendResponse } = require('../../../utils/responseHandler');
// const { updateSingleDropField } = require('../drops/service');

const getSeriesById = catchAsync(async (req, res) => {
    const { seriesId } = await pick(req.params, ['seriesId']);
    console.log("series id---", seriesId);
    // const userId = req.user ? req.user.id : null
    const list = await seriesService.getSeriesbyId(seriesId);
    if (list) {
        sendResponse(res, httpStatus.OK, list, null);
    } else {
        sendResponse(res, httpStatus.BAD_REQUEST, null, 'Not able to add Series, please try again');
    }
});

module.exports = getSeriesById