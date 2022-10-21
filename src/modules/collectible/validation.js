const Joi = require('joi');
const { objectId } = require('../../validations/custom.validation');
// const { objectId } = require('./custom.validation');

const addCollectible = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    tokenAbbrevation: Joi.string().allow(""),
    description:Joi.string().allow(""),
    noOfEdition:Joi.number().allow(""),
    editionType:Joi.string().allow(""),

    coverBgColor:Joi.string(),
    pageBgColor:Joi.string(),
    coverDescBgColor:Joi.string(),
    pageDescFontColor:Joi.string(),
    displayMediaType:Joi.string().allow(""),
    displayMetaData:Joi.object().allow(""),
    currency:Joi.string().allow(""),
    displayMedia:Joi.string().allow(""),
    coverMediaType:Joi.string().allow(""),
    coverMetaData:Joi.object(),
    coverMedia:Joi.string().allow(""),
    collectionId:Joi.string().allow(""),
    brandId:Joi.custom(objectId).required(),
    seriesId:Joi.custom(objectId).required(),
    ownerId:Joi.custom(objectId).required(),
    price:Joi.number().allow(""),
    primaryCommission:Joi.number().allow(""),
    secondaryCommission:Joi.number().allow(""),
    secondaryRoyalty:Joi.number().allow(""),
    status:Joi.string().allow(""),
    // mintedOn:Joi.date(),
    season:Joi.number().allow(""),
    rarity:Joi.string().allow(""),
    type:Joi.string().allow(""),
    active:Joi.boolean(),
  }),
};
const collectiblesListBySeriesId = {
  body: Joi.object().keys({
    start: Joi.number().required(),
    limit: Joi.number().required(),
    seriesId: Joi.string().required(),
    collectionId:Joi.string().required()
  }),
}
const removeCollectible = {
  body: Joi.object().keys({
    id: Joi.string().required(),
  }),
};

const listCollectible = {
  body: Joi.object().keys({
    filter: Joi.object().required(),
    options: Joi.object().required(),
  }),
};
const listAllCollectible = {
  body: Joi.object().keys({
    filter: Joi.object().required(),
    options: Joi.object().required(),
  }),
};
module.exports = {
    addCollectible,
    removeCollectible,
    listCollectible,
    collectiblesListBySeriesId,
    listAllCollectible
};
