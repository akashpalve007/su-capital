const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const { nftUsersValidation } = require('../../validations');
const { nftUserController } = require('../../controllers');

const router = express.Router();



router.route('/add-brand').post( validate(nftUsersValidation.addUser),nftUserController.addUser);

router.route('/update/:id').post(nftUserController.updateUser);
router.route('/get-brand/:id').get(auth('manageUsers'), validate(nftUsersValidation.getUser), nftUserController.getIndividualBrand);

router.route('/get-brands').post(auth('manageUsers'), validate(nftUsersValidation.listUsers), nftUserController.listUsers);



router
  .route('/delete-brand')
  .post(auth('manageUsers'), validate(nftUsersValidation.deleteUser), nftUserController.deleteUser);




module.exports = router;
