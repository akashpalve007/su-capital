const httpStatus = require('http-status');
const mongoose = require('mongoose');
const { User } = require('../models');
const ApiError = require('../utils/ApiError');
const bcrypt = require('bcryptjs');
const { sendResponse } = require('../utils/responseHandler');

/**
 * Create a user
 * @param {Object} userBody
 * @returns {Promise<User>}
 */
const createUser = async (userBody) => {
  if (await User.isEmailTaken(userBody.email)) {
    sendResponse('Email Already taken');
  }
  const user = await User.create(userBody);
  return user;
};
/**
 * 
 * @param {String} username 
 * @returns 
 */
const isEmailAvailable = async (email, userId) => {
  const user = await User.findOne({ email, _id: { $ne: userId } });
  return !!user;
};
/**
 * Query for users
 * @param {Object} filter - Mongo filter
 * @param {Object} options - Query options
 * @param {string} [options.sortBy] - Sort option in the format: sortField:(desc|asc)
 * @param {number} [options.limit] - Maximum number of results per page (default = 10)
 * @param {number} [options.page] - Current page (default = 1)
 * @returns {Promise<QueryResult>}
 */
const queryUsers = async (filter, options) => {
  const users = await User.paginate(filter, options);
  return users;
};

/**
 * Get user by id
 * @param {ObjectId} id
 * @returns {Promise<User>}
 */
const getUserById = async (id) => {
  return User.findById(id);
};

/**
 * Get user by email
 * @param {string} email
 * @returns {Promise<User>}
 */
const getUserByEmail = async (email) => {
  return User.findOne({ email, active: true });
};


/**
 * Update user by id
 * @param {ObjectId} userId
 * @param {Object} updateBody
 * @returns {Promise<User>}
 */
const updateUserById = async (userId, updateBody) => {
  const user = await getUserById(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  if (updateBody.email && (await User.isEmailTaken(updateBody.email, userId))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  Object.assign(user, updateBody);
  await user.save();
  return user;
};

/**
 * Delete user by id
 * @param {ObjectId} userId
 * @returns {Promise<User>}
 */
const deleteUserById = async (userId, updateBody) => {
  let filterQuery = { active: true, _id: mongoose.Types.ObjectId(userId) }
  const removed = await User.updateOne(filterQuery, { $set: { active: false } })
  // console.log("removed----",removed)
  return removed
};

const listActiveUser = async (start, limit, filter) => {
  // console.log("listActiveUser ::", start, limit, filter);
  let searchQuery = { role: 'user' };
  if (Object.keys(filter).length > 0) {
    searchQuery = { ...searchQuery, ...filter };
  }
  const listResult = await User.aggregate([
    {
      $match: searchQuery,
    },
    {
      $project: {
        id: '$_id',
        fullName: 1,
        twitterUrl: 1,
        facebookUrl: 1,
        youtubeUrl: 1,
        instagramUrl: 1,
        email: 1,
        name: 1,
        isEmailVerified: 1,
        shortTermGoal: 1,
        longTermGoal: 1,
        portfolioLink: 1,
        profilePic: 1,
        role: 1,
        status: 1,
        createdAt: 1,
        username: 1,
        brandId: 1,
        coverImage: 1,
        bio: 1,
        isEmailVerified: 1,
        isFeaturedBrand: 1,
        active: 1,
      },
    },
    {
      $project: {
        _id: 0,
      },
    },
    {
      $sort: {
        createdAt: -1,
      },
    },
  ])
    .skip(start)
    .limit(limit);
  const totalCount = await User.countDocuments(searchQuery);
  const filteredCount = listResult.length;
  return { users: listResult, totalCount, filteredCount };
};

/**
 * Get a All users List for Backend Admin Dropdown
 * @param {Object} pagination
 * @returns {Promise<Auction>}
 */

const listAllUsers = async (start = 0, limit = 20, search) => {
  let filterQuery = { active: true }
  if (search) {
    filterQuery['username'] = { $regex: new RegExp(`^${search}`), $options: 'i' }
  }
  const listResult = await User.aggregate([
    {
      $match: filterQuery,
    },
    {
      $project: {
        _id: 1,
        email: 1,
        name: 1,
        role: 1,
        username: 1,
      },
    },
    {
      $sort: {
        createdAt: -1,
      },
    },
  ])
    .skip(start)
    .limit(limit);
  const totalCount = await User.countDocuments({ active: true });
  const filteredCount = listResult.length;
  return { users: listResult, totalCount, filteredCount };
};

const userstatus = async (status, brandId) => {
  const searchQuery = { _id: mongoose.Types.ObjectId(brandId) };
  const result = await User.findOneAndUpdate(searchQuery, { profileStatus: status }, { new: true, useFindAndModify: false });
  return result;
};
const getMyProfileDetail = async(userId) => {
  const searchQuery = { _id: mongoose.Types.ObjectId(userId) };

  const result = await User.findOne(searchQuery);
  return result;

}

const updateMyProfileDetail = async (userId, profileData) => {
  let userIdObjId = mongoose.Types.ObjectId(userId)
  const updateResult = await User.updateOne({_id: userIdObjId}, { $set: profileData }, {new: true})
  return updateResult
}


module.exports = {
  createUser,
  queryUsers,
  getUserById,
  updateUserById,
  deleteUserById,
  listActiveUser,
  listAllUsers,
  userstatus,
  getUserByEmail,
  isEmailAvailable,
  getMyProfileDetail,
  updateMyProfileDetail
};
