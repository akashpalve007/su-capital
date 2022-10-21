const Joi = require('joi');
const { objectId } = require('../../validations/custom.validation');
// const { objectId } = require('./custom.validation');

const addDrop = {
  body: Joi.object().keys({
   dateFrom:Joi.date().required(),
   dateTo:Joi.date().required(),
   type:Joi.string().required(),
   comicId:Joi.custom(objectId)

  }),
};
const listDrop = {
  body: Joi.object().keys({
    filter: Joi.object().required(),
    options: Joi.object().required(),
  }),
};

const removeDrop = {
  body: Joi.object().keys({
    id: Joi.string().required(),
  }),
};

module.exports = {
    addDrop,
    listDrop,
    removeDrop
};
