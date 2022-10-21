const httpStatus = require('http-status');
const pick = require('../../../utils/pick');
const catchAsync = require('../../../utils/catchAsync');
const comicService = require('../service');
const Comic = require('../model')
const { sendResponse } = require('../../../utils/responseHandler');

const addComic = catchAsync(async (req, res) => {
    console.log("req user",req.user);
    var ownerId = req.user.id
    const {
      name,
      description,
      brandId,
      seriesId, collectionId,
      writerName, publisherName,
      backgroundColor,
      backgroundImage,
      coverImage,
      displayImage,
      writerId,
      publisherId,
      noOfEditions,
      startYear,
      pages,
      characters,
      type,
      season,
      rarity,
      primaryCommission,
      secondaryCommission,
      secondaryRoyalty,
      price,
      coverBgColor,
      pageBgColor,
      coverDescBgColor,
      pageDescFontColor,
      currency
  
    } = await pick(req.body, [
      "name",
      "description",
      "ownerId",
      "brandId",
      "backgroundColor",
      "backgroundImage",
      "coverImage",
      "displayImage",
      "seriesId",
      "writerId","collectionId",
      "writerName","publisherName",
      "publisherId",
      "noOfEditions",
      "pages",
      "characters",
      "startYear",
      "type",
      "season",
      "rarity",
      "primaryCommission",
      "secondaryCommission",
      "secondaryRoyalty",
      "price",
      "coverBgColor",
      "pageBgColor",
      "coverDescBgColor",
      "pageDescFontColor",
      "currency"
    ]);
  
  //   if (setCoverImage) updateSingleDropField(dropId, 'coverImage', mediaUrl);
  //   if (setDisplayImage) updateSingleDropField(dropId, 'displayImage', mediaUrl);
  
    const insertResult = await comicService.addComic({
      name,
      description,
      ownerId,
      brandId,
      startYear,
      backgroundColor,
      backgroundImage,
      coverImage,
      seriesId, collectionId,
      writerName, publisherName,
      displayImage,
      writerId,
      publisherId,
      noOfEditions,
      characters,
      pages,
      price,
      type,
      season,
      rarity,
      primaryCommission,
      secondaryCommission,
      secondaryRoyalty,
      coverBgColor,
      pageBgColor,
      coverDescBgColor,
      pageDescFontColor,
      currency,
    });
  
    if (insertResult) {
      sendResponse(res, httpStatus.OK, insertResult, null);
    } else {
      sendResponse(res, httpStatus.BAD_REQUEST, null, 'Not able to create comic, please try again');
    }
  });

  module.exports = addComic