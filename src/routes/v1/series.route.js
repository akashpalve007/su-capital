const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const seriesValidation = require('../../modules/series/validation');
const { addSeries,
    updateSeries,
    getSeriesListByCollectionId,
    getAllSeries,
    getSeriesById,
    removeSeries } = require('../../modules/series/controller/index');

const router = express.Router();
//public routes
//list all series
router.route('/all').post(validate(seriesValidation.listSeries), getAllSeries);

// get collection by id
router.route('/public/:seriesId').post(getSeriesById);

//Admin API  routes
//series list by collectionId 
router.route('/list').post(auth('manageUsers'), validate(seriesValidation.seriesListByCollectionId),     getSeriesListByCollectionId,
);

//add series
router.route('/add').post(auth('manageUsers'), validate(seriesValidation.addSeries), addSeries);
//delete series 
router.route('/delete').post(auth('manageUsers'), validate(seriesValidation.removeSeries), removeSeries);
// get series by id
router.route('/:seriesId').post(auth('manageUsers'), getSeriesById);
//update series
router.route('/update/:seriesId').post(auth('manageUsers'), validate(seriesValidation.addSeries), updateSeries);


module.exports = router;
