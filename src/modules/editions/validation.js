const Joi = require('joi');
const { objectId } = require('../../validations/custom.validation');

const createEditions = {
  body: Joi.object().keys({
    collectibleId: Joi.custom(objectId).required(),
  }),
};
module.exports = {
    createEditions
};
