const mongoose = require('mongoose');
const Comic = require('../model');


const getComicListBySeriesId = async (seriesId,collectionId, start, limit) => {
  let filterQuery = { active: true }
  if (seriesId) filterQuery.seriesId = mongoose.Types.ObjectId(seriesId)
  if (collectionId) filterQuery.collectionId = mongoose.Types.ObjectId(collectionId)

  // let aggregateQuery = [
  //   {
  //     $match: filterQuery
  //   },
  //   {
  //     $lookup: {
  //       from: 'users',
  //       localField: 'brandId',
  //       foreignField: '_id',
  //       as: 'brandObj'
  //     }
  //   }, {
  //     $unwind: { path: '$brandObj', preserveNullAndEmptyArrays: true }
  //   },
  //   {
  //     $lookup: {
  //       from: 'users',
  //       localField: 'ownerId',
  //       foreignField: '_id',
  //       as: 'ownerObj'
  //     }
  //   }, {
  //     $unwind: { path: '$ownerObj', preserveNullAndEmptyArrays: true }
  //   },
  //   {
  //     $lookup: {
  //       from: 'collections',
  //       localField: 'collectionId',
  //       foreignField: '_id',
  //       as: 'collectionObj'
  //     }
  //   },
  //   {
  //     $unwind: { path: '$collectionObj', preserveNullAndEmptyArrays: true }
  //   },
  //   {
  //     $lookup: {
  //       from: 'series',
  //       localField: 'seriesId',
  //       foreignField: '_id',
  //       as: 'seriesObj'
  //     }
  //   },
  //   {
  //     $unwind: { path: '$seriesObj', preserveNullAndEmptyArrays: true }
  //   },
    
  // ]
  // const listResult = await Collectible.aggregate(aggregateQuery).skip(start).limit(limit);
  const listResult = await Comic.find(filterQuery).skip(start).limit(limit);

  const totalCount = await Comic.countDocuments({});
  const filteredCount = listResult.length;
  return { ComicData: listResult, totalCount, filteredCount };


  
}

module.exports = getComicListBySeriesId