const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const collectibleValidation = require('../../modules/collectible/validation');
const {
    addCollectible,
    updateCollectible,
    getCollectibleById,
    getCollectibleListBySeriesId,
    listAllCollectible,
    listCollectible,
    removeCollectible
} = require('../../modules/collectible/controller/index');

const router = express.Router();
//PUBLIC ROUTES
//all collectibles
router.route('/all-collectibles').post(  listAllCollectible);


//ADMIN ROUTES

//list all collectibles
router.route('/all').post(auth('manageUsers'), validate(collectibleValidation.listCollectible), listCollectible);
//digital arts list by seriesId 
router.route('/list').post(auth('manageUsers'), validate(collectibleValidation.collectiblesListBySeriesId), getCollectibleListBySeriesId);

//add digital art
router.route('/add').post(auth('manageUsers'), validate(collectibleValidation.addCollectible), addCollectible);
//delete digital art
router.route('/delete').post(auth('manageUsers'), validate(collectibleValidation.removeCollectible), removeCollectible);
// get digital art by id
router.route('/:collectibleId').post(getCollectibleById);
//update digital art
router.route('/update/:collectibleId').post(auth('manageUsers'), validate(collectibleValidation.addCollectible), updateCollectible);


module.exports = router;
