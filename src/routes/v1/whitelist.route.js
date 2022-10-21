const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const whitelistValidation = require('../../modules/whiteList/validation');

const {
    addWhiteList,
    listWhiteList,
    removeWhiteList,
    getWhiteListById,
    updateWhiteList
} = require('../../modules/whiteList/controller/index');

const router = express.Router();

//PUBLIC APIS
//list all whitelists
router.route('/public/all-whitelists').post(listWhiteList);



//ADMIN APIS
router.route('/all').post(auth('manageUsers'), validate(whitelistValidation.listWhitelist), listWhiteList);

router.route('/add').post(auth('manageUsers'), validate(whitelistValidation.addWhitelist), addWhiteList);

//delete whitelist 
router.route('/delete').post(auth('manageUsers'), validate(whitelistValidation.removeWhitelist), removeWhiteList);
router.route('/:whitelistId').post(auth('manageUsers'), getWhiteListById);
//update whitelist
router.route('/update/:whitelistId').post(auth('manageUsers'), updateWhiteList);

module.exports = router;
