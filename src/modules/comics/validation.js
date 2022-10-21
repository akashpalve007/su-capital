const Joi = require('joi');
const { objectId } = require('../../validations/custom.validation');
// const { objectId } = require('./custom.validation');

const addComic = {
  body: Joi.object().keys({
    name: Joi.string().required(),
    description: Joi.string().allow(""),
    brandId: Joi.custom(objectId),
    seriesId: Joi.custom(objectId),
    collectionId: Joi.custom(objectId),
    startYear:Joi.string(),
    writerName:Joi.string(),
    publisherName:Joi.string(),
    price:Joi.number(),
    characters:Joi.string(),

    coverBgColor:Joi.string(),
    pageBgColor:Joi.string(),
    coverDescBgColor:Joi.string(),
    pageDescFontColor:Joi.string(),
    backgroundImage: Joi.string().allow(""),
    coverImage: Joi.string().allow(""),
    displayImage: Joi.string().allow(""),
    writerId: Joi.custom(objectId).allow(""),
    publisherId: Joi.custom(objectId).allow(""),
    noOfEditions: Joi.number().allow(""),
    pages: Joi.number().allow(""),
    type: Joi.string().allow(""),
    season: Joi.number().allow(""),
    rarity: Joi.string().allow(""),
    primaryCommission: Joi.number().allow(""),
    secondaryCommission: Joi.number().allow(""),
    secondaryRoyalty: Joi.number().allow(""),
    currency: Joi.string().allow(""),

  }),
};

const removeComic = {
  body: Joi.object().keys({
    id: Joi.string().required(),
  }),
};
const comicListBySeriesId = {
  body: Joi.object().keys({
    start: Joi.number().required(),
    limit: Joi.number().required(),
    seriesId: Joi.string().required(),
    collectionId:Joi.string().required()
  }),
}
const listAllComic = {
  body: Joi.object().keys({
    filter: Joi.object().required(),
    options: Joi.object().required(),
  }),
};
const listComic = {
  body: Joi.object().keys({
    filter: Joi.object().required(),
    options: Joi.object().required(),
  }),
};
module.exports = {
    addComic,
    removeComic,
    listAllComic,
    listComic,
    comicListBySeriesId
};
