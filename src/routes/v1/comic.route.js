const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const comicValidation = require('../../modules/comics/validation');
const {
    addComic,
    updateComic,
    getComicbyId,
    listComic,
    listAllComic,
    removeComic,
    getComicListBySeriesId
} = require('../../modules/comics/controller/index');

const router = express.Router();

//PUBLIC APIS
//list all comics
router.route('/public/all-comics').post( validate(comicValidation.listAllComic), listAllComic);

//get comic by id 
router.route('/public/:comicId').post(  getComicbyId);


//ADMIN APIS
//list all comics
router.route('/all').post(auth('manageUsers'), validate(comicValidation.listComic), listComic);
//comics  list by seriesId 
router.route('/list').post(auth('manageUsers'), validate(comicValidation.comicListBySeriesId), getComicListBySeriesId);
//add comic
router.route('/add').post(auth('manageUsers'), validate(comicValidation.addComic), addComic);
//update comic
router.route('/update/:comicId').post(auth('manageUsers'), validate(comicValidation.addComic), updateComic);
//delete comic
router.route('/delete').post(auth('manageUsers'), validate(comicValidation.removeComic), removeComic);
router.route('/:comicId').post(auth('manageUsers'), getComicbyId);



module.exports = router;
