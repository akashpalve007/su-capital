const Joi = require('joi');
const { objectId } = require('../../validations/custom.validation');
// const { objectId } = require('./custom.validation');

const addCollection = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    description:Joi.string().allow(""),
    brandId:Joi.custom(objectId).required(),
    coverBgColor:Joi.string(),
    pageBgColor:Joi.string(),
    coverDescBgColor:Joi.string(),
    pageDescFontColor:Joi.string(),
    backgroundImage:Joi.string().allow(""),
    coverImage:Joi.string().allow(""),
    displayImage:Joi.string().allow(""),

  }),
};
const listCollection = {
  body: Joi.object().keys({
    filter: Joi.object().required(),
    options: Joi.object().required(),
  }),
};

const removeCollection = {
  body: Joi.object().keys({
    id: Joi.string().required(),
  }),
};

module.exports = {
    addCollection,
    listCollection,
    removeCollection
};
