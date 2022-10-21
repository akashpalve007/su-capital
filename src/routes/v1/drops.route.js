const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const {
    addDrop,
    listDrop,
    getDropById,
    updateDrop,
    removeDrop
} = require('../../modules/drops/controller/index');

const router = express.Router();

//PUBLIC APIS
//list all drops
router.route('/public/all-drops').post(listDrop);

//get drop by id 
router.route('/public/:dropId').post(getDropById);


//ADMIN APIS
router.route('/all').post(auth('manageUsers'), listDrop);

router.route('/add').post(auth('manageUsers'), addDrop);
//update drop
router.route('/update/:dropId').post(auth('manageUsers'), updateDrop);
//delete drop
router.route('/delete').post(auth('manageUsers'), removeDrop);
router.route('/:dropId').post(auth('manageUsers'), getDropById);



module.exports = router;
