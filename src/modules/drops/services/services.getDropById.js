const mongoose = require('mongoose');
const Drops = require('../model');


const getDropById = async (collectionId) => {

    let response = await Drops.aggregate([
      {
        $match: { _id: mongoose.Types.ObjectId(collectionId) }
      },
      
      {
        $lookup: {
          from: 'users',
          localField: 'ownerId',
          foreignField: '_id',
          as: 'ownerObj'
        }
      }, 
      {
        $unwind: { path: '$ownerObj', preserveNullAndEmptyArrays: true }
      },
      
    ]).exec()
  
    return response.map(item => {
      return {
        ...item,
        ownerObj: item.ownerObj ? item.ownerObj : {}
      }
    })
  }
  

module.exports = getDropById
