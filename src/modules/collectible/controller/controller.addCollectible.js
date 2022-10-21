const httpStatus = require('http-status');
const pick = require('../../../utils/pick');
const catchAsync = require('../../../utils/catchAsync');
const  collectibleService  = require('../service');

const DigitalArt = require('../model')

const { sendResponse } = require('../../../utils/responseHandler');

const addCollectible = catchAsync(async (req, res) => {
  console.log("req user",req.user);
  var ownerId = req.user.id
  const {
    name,
    tokenAbbrevation,
    description,
    noOfEdition,
    coverBgColor,
    pageBgColor,
    coverDescBgColor,
    pageDescFontColor,
    displayMediaType,
    displayMetaData,
    displayMedia,
    coverMediaType,
    coverMetaData,
    coverMedia,
    collectionId,
    brandId,
    seriesId,
    price,
    primaryCommission,
    secondaryCommission,
    secondaryRoyalty,
    status,
    mintedOn,
    season,
    rarity,
    type,
    active,

  } = await pick(req.body, [
    "name",
    "tokenAbbrevation",
    "description",
    "noOfEdition",
    'coverBgColor',
    'pageBgColor',
    'coverDescBgColor',
    'pageDescFontColor',
    "displayMediaType",
    "displayMetaData",
    "displayMedia",
    "coverMediaType",
    "coverMetaData",
    "coverMedia",
    "collectionId",
    "ownerId",
    "brandId",
    "seriesId",
    "price",
    "primaryCommission",
    "secondaryCommission",
    "secondaryRoyalty",
    "status",
    "mintedOn",
    "season",
    "rarity",
    "type",
    "active",
  ]);


  const insertResult = await collectibleService.addCollectible({
    name,
    tokenAbbrevation,
    description,
    noOfEdition,
    coverBgColor,
    pageBgColor,
    coverDescBgColor,
    pageDescFontColor,
    displayMediaType,
    displayMetaData,
    displayMedia,
    coverMediaType,
    coverMetaData,
    coverMedia,
    collectionId,
    brandId,
    seriesId,
    price,
    primaryCommission,
    secondaryCommission,
    secondaryRoyalty,
    status,
    mintedOn,
    season,
    rarity,
    type,
    active,
    ownerId: ownerId,
  });

  if (insertResult) {
    sendResponse(res, httpStatus.OK, insertResult, null);
  } else {
    sendResponse(res, httpStatus.BAD_REQUEST, null, 'Not able to create collection, please try again');
  }
});
  
module.exports = addCollectible
    