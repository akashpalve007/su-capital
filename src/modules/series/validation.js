const Joi = require('joi');
const { objectId } = require('../../validations/custom.validation');
// const { objectId } = require('./custom.validation');

const addSeries = {
  body: Joi.object().keys({
    seriesName: Joi.string().required(),
    description:Joi.string().allow(""),
    brandId:Joi.custom(objectId).required(),
    collectionId:Joi.custom(objectId).required(),
    launchDate:Joi.date().required(),
    launchTime:Joi.string().required().allow(""),
    // price:Joi.number().required(),
    secondaryRoyalty:Joi.number().required(),
    primaryCommission:Joi.number().required(),
    secondaryCommission:Joi.number().required(),
    coverBgColor:Joi.string(),
    pageBgColor:Joi.string(),
    coverDescBgColor:Joi.string(),
    pageDescFontColor:Joi.string(),
    backgroundImage:Joi.string().allow(""),
    coverImage:Joi.string().allow(""),
    displayImage:Joi.string().allow(""),
    displayMediaType:Joi.string().allow(""),
    coverMediaType:Joi.string().allow(""),
    coverMediaMeta:Joi.object(),
    displayMediaMeta:Joi.object()

  }),
};
const listSeries = {
  body: Joi.object().keys({
    filter: Joi.object().required(),
    options: Joi.object().required(),
  }),
};

const removeSeries = {
  body: Joi.object().keys({
    id: Joi.string().required(),
  }),
};

const seriesListByCollectionId = {
  body: Joi.object().keys({
    start: Joi.number().required(),
    limit: Joi.number().required(),
    collectionId: Joi.string().required(),
  }),
}
module.exports = {
    addSeries,
    listSeries,
    removeSeries,
    seriesListByCollectionId
};
