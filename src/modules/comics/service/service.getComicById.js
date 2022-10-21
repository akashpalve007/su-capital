const mongoose = require('mongoose');
const Comic = require('../model');

const getComicbyId = async (comicId) => {

  let response = await Comic.aggregate([
    {
      $match: { _id: mongoose.Types.ObjectId(comicId) }
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
    
  ]).exec()

  return response.map(item => {
    return {
      ...item,
      brandObj: item.brandObj ? item.brandObj : {}
    }
  })
}
  

module.exports = getComicbyId