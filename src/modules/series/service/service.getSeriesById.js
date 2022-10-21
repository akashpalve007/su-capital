const mongoose = require('mongoose');
const Series = require('../model');

const getSeriesById = async (seriesId) => {

  let response = await Series.aggregate([
    {
      $match: { _id: mongoose.Types.ObjectId(seriesId) }
    },
    
   
    {
      $lookup: {
        from: 'users',
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
    
  ]).exec()

  return response.map(item => {
    return {
      ...item,
      brandObj: item.brandObj ? item.brandObj : {},
      collectionObj:item.collectionObj ? item.collectionObj:{},
      ownerObj: item.ownerObj ? item.ownerObj:{}
    }
  })
}

module.exports = getSeriesById