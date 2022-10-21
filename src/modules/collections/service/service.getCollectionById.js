const mongoose = require('mongoose');
const Collections = require('../model');


const getCollectionbyId = async (collectionId) => {

    let response = await Collections.aggregate([
      {
        $match: { _id: mongoose.Types.ObjectId(collectionId) }
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
      }, 
      {
        $unwind: { path: '$ownerObj', preserveNullAndEmptyArrays: true }
      },
      {
        $lookup: {
          "from": "series",
          "let": { "id": "$_id" },
          "pipeline": [
            { "$match": { "$expr": { "$eq": ["$collectionId", "$$id"] } } },
            {
              "$match": {
                "active": true
              },
            },
  
          ],
          "as": "seriesArr"
        }
      }, 

      {
        $lookup: {
          from: "collectibles",
          localField: "seriesArr._id",
          foreignField: "seriesId",
          as: "collectiblesArr"
        }
      },
      {
        $group: {
          _id: "$_id",
          name: {
            $first: "$name"
          },
          description: {
            $first: "$description"
          },
          displayImage: {
            $first: "$displayImage"
          },
          coverImage: {
            $first: "$coverImage"
          },
          seriesArr: {
            $push: {
              name: "$seriesArr.seriesName",
              collectiblesArr: "$collectiblesArr"
            }
          }
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
  

module.exports = getCollectionbyId
