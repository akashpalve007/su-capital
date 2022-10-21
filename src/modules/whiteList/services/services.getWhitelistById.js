const mongoose = require('mongoose');
const Whitelist = require('../model');

const getWhitelistbyId = async (whitelistId) => {

  let response = await Whitelist.aggregate([
    {
      $match: { _id: mongoose.Types.ObjectId(whitelistId) }
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
          from: 'drops',
          localField: 'dropId',
          foreignField: '_id',
          as: 'dropObj'
        }
      }, 
      {
        $unwind: { path: '$dropObj', preserveNullAndEmptyArrays: true }
      },
  ]).exec()

  return response.map(item => {
    return {
      ...item,
      ownerObj: item.ownerObj ? item.ownerObj : {}
    }
  })
}
  

module.exports = getWhitelistbyId