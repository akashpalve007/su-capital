const mongoose = require('mongoose');
const Collections = require('../model');


const getCollectionList = async (filter, options) => {
    const limit = options.limit && parseInt(options.limit, 10) > 0 ? parseInt(options.limit, 10) : 10;
      const page = options.page && parseInt(options.page, 10) > 0 ? parseInt(options.page, 10) : 1;
      const skip = (page - 1) * limit;
  
    let filterQuery = {...filter, active:true}
  
    let aggregateQuery = [
      {
        $match:filterQuery
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
    ]
    const listResult  = await Collections.aggregate(aggregateQuery).sort({_id:-1}).skip(skip).limit(limit)
   
    const totalResults = await Collections.countDocuments({active:true});
    const totalPages = Math.ceil(totalResults / limit);
  
    const filteredCount = listResult.length;
    return { results: listResult, totalResults, totalPages, page , limit };
  }

module.exports = getCollectionList
