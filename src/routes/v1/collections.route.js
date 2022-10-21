const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const collectionValidation = require('../../modules/collections/validation');
const {
    addCollection,
    updateCollection,
    getCollectionById,
    listAllCollections,
    listCollectionController,
    removeCollection
} = require('../../modules/collections/controller/index');

const router = express.Router();

//public apis
//list all collections
router.route('/all-collections').post(listAllCollections);
// get collection by id
router.route('/public/:collectionId').post(getCollectionById);

//list all collections
router.route('/all').post(auth('manageUsers'), listCollectionController);
//add collection
router.route('/add').post(auth('manageUsers'), validate(collectionValidation.addCollection), addCollection);
//delete collection 
router.route('/delete').post(auth('manageUsers'), validate(collectionValidation.removeCollection), removeCollection);
// get collection by id
router.route('/:collectionId').post(auth(), getCollectionById);
//update collection
router.route('/update/:collectionId').post(auth('manageUsers'), validate(collectionValidation.addCollection), updateCollection);



module.exports = router;
