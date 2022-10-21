const Joi = require('joi');
const { objectId } = require('../../validations/custom.validation');
// const { objectId } = require('./custom.validation');

const addWhitelist = {
  body: Joi.object().keys({
   name:Joi.string().required(),
   dropId:Joi.custom(objectId).required(),
   walletAddress:Joi.array().unique()

  }),
};
const listWhitelist = {
  body: Joi.object().keys({
    filter: Joi.object().required(),
    options: Joi.object().required(),
  }),
};

const removeWhitelist = {
  body: Joi.object().keys({
    id: Joi.string().required(),
  }),
};

module.exports = {
    addWhitelist,
    listWhitelist,
    removeWhitelist
};
