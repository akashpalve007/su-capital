const mongoose = require('mongoose');
const Series = require('../model');


const getSeriesByCollectionId = async (collectionId, start, limit) => {
  let filterQuery = { active: true }
  if (collectionId) filterQuery.collectionId = mongoose.Types.ObjectId(collectionId)

  let aggregateQuery = [
    {
      $match: filterQuery
    },
    {
      $lookup: {
        from: 'collections',
        localField: 'collectionId',
        foreignField: '_id',
        as: 'collectionObj'
      }
    },
    {
      $lookup: {
        "from": "collectibles",
        "let": { "id": "$_id" },
        "pipeline": [
          { "$match": { "$expr": { "$eq": ["$seriesId", "$$id"] } } },
          {
            "$match": {
              "active": true
            },
          },

        ],
        "as": "collectiblesData"
      }
    },
 
    {
      $lookup: {
        "from": "comics",
        "let": { "id": "$_id" },
        "pipeline": [
          { "$match": { "$expr": { "$eq": ["$seriesId", "$$id"] } } },
          {
            "$match": {
              "active": true
            },
          },

        ],
        "as": "comicsData"
      }
    },
  

    {
      $group: {

        _id: "$_id",
        "seriesName": {
          "$first": "$seriesName"
        },
        "description": {
          "$first": "$description"
        },
        "price": {
          "$first": "$price"
        },
        "currency": {
          "$first": "$currency"
        },
        "active": {
          "$first": "$active"
        },
        "displayImage": {
          "$first": "$displayImage"
        },
        "coverImage": {
          "$first": "$coverImage"
        },
        "launchDate": {
          "$first": "$launchDate"
        },
        "collectionId": {
          "$first": "$collectionId"
        },
        "brandId": {
          "$first": "$brandId"
        },
        "comicsData": {
          "$first": "$comicsData"
        },
        "collectiblesData": {
          "$first": "$collectiblesData"
        },
      }
    },
  ]
  const listResult = await Series.aggregate(aggregateQuery).sort({_id:-1}).skip(start).limit(limit);
  const totalCount = await Series.countDocuments({});
  const filteredCount = listResult.length;
  return { seriesData: listResult, totalCount, filteredCount };
};
module.exports = getSeriesByCollectionId