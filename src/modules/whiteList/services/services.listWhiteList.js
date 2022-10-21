const mongoose = require('mongoose');
const WhiteLists = require('../model');


const getWhiteListList = async (filter, options) => {
    const limit = options.limit && parseInt(options.limit, 10) > 0 ? parseInt(options.limit, 10) : 10;
      const page = options.page && parseInt(options.page, 10) > 0 ? parseInt(options.page, 10) : 1;
      const skip = (page - 1) * limit;
  
    let filterQuery = {...filter, active:true}
  
    let aggregateQuery = [
        {
          $match: filterQuery
        },
        {
          $lookup: {
            from: 'drops',
            localField: 'dropId',
            foreignField: '_id',
            as: 'dropObj'
          }
        }, {
          $unwind: { path: '$dropObj', preserveNullAndEmptyArrays: true }
        },
        // {
        //   $lookup: {
        //     from: 'series',
        //     localField: 'dropObj.seriesId',
        //     foreignField: '_id',
        //     as: 'seriesArr'
        //   }
        // }, 
        // {
        //   $lookup: {
        //     from: 'collectibles',
        //     localField: 'dropObj.collectibleId',
        //     foreignField: '_id',
        //     as: 'collectibleArr'
        //   }
        // }, 
        // {
        //   $lookup: {
        //     from: 'comics',
        //     localField: 'dropObj.comicId',
        //     foreignField: '_id',
        //     as: 'comicArr'
        //   }
        // }, 
        // {
        //   $lookup: {
        //     from: 'collections',
        //     localField: 'dropObj.collectionId',
        //     foreignField: '_id',
        //     as: 'collectionArr'
        //   }
        // }, 
        // {
        //   $group:{
        //     _id:"$_id",
            
        //   }
        // }
      ]
    const listResult  = await WhiteLists.aggregate(aggregateQuery).sort({_id:-1}).skip(skip).limit(limit)
   
    const totalResults = await WhiteLists.countDocuments({active:true});
    const totalPages = Math.ceil(totalResults / limit);
  
    const filteredCount = listResult.length;
    return { results: listResult, totalResults, totalPages, page , limit };
  }

module.exports = getWhiteListList
