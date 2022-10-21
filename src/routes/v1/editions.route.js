const express = require('express');
const validate = require('../../middlewares/validate');
const validation = require('../../modules/editions/validation');
const {createEditions} = require('../../modules/editions/controller/index');
const auth = require('../../middlewares/auth');

const router = express.Router();

router.route('/').post(validate(validation.createEditions), createEditions);

module.exports = router;
