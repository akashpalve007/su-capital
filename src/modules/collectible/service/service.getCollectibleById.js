const mongoose = require('mongoose');
const Collectible = require('../model');

const getCollectiblebyId = async (collectibleId, userId) => {

    let response = await Collectible.aggregate([
      {
        $match: { _id: mongoose.Types.ObjectId(collectibleId) }
      },
  
      {
        $lookup: {
          from: 'brands',
          localField: 'brandId',
          foreignField: '_id',
          as: 'brandObj'
        }
      }, {
        $unwind: { path: '$brandObj', preserveNullAndEmptyArrays: true }
      },
      {
        $lookup: {
          from: 'users',
          localField: 'ownerId',
          foreignField: '_id',
          as: 'ownerObj'
        }
      }, {
        $unwind: { path: '$ownerObj', preserveNullAndEmptyArrays: true }
      },
      {
        $lookup: {
          from: 'collections',
          localField: 'collectionId',
          foreignField: '_id',
          as: 'collectionObj'
        }
      }, {
        $unwind: { path: '$collectionObj', preserveNullAndEmptyArrays: true }
      },
      {
        $lookup: {
          from: 'series',
          localField: 'seriesId',
          foreignField: '_id',
          as: 'seriesObj'
        }
      },
      {
        $unwind: { path: '$seriesObj', preserveNullAndEmptyArrays: true }
      },
      {
        $lookup: {
          from: 'collectibles',
          localField: 'seriesId',
          foreignField: 'seriesId',
          as: 'seriesArr'
        }
      }
  
    ]).exec()
  
    return response.map(item => {
      return {
        ...item,
        brandObj: item.brandObj ? item.brandObj : {}
      }
    })
  }
  

module.exports = getCollectiblebyId