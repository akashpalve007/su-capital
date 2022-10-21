const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const { userService } = require('../services');
const { sendResponse } = require('../utils/responseHandler');
const authService = require('./../services/auth.service');
const User = require("../models/user.model")

const createUser = catchAsync(async (req, res) => {
  const isEmailAvailable = await userService.isEmailAvailable(req.body.email)
  if (isEmailAvailable) {
    sendResponse(res, httpStatus.BAD_REQUEST, null, 'Email already taken');

  }
  const user = await userService.createUser(req.body);
  if (user) {
    sendResponse(res, httpStatus.OK, user, "User Added Successfully");
  } else {
    sendResponse(res, httpStatus.BAD_REQUEST, null, 'Something went wrong');
  }
});
const getUsers = catchAsync(async (req, res) => {
  // console.log(req.query, '....req query');
  var result1 = {
    ...JSON.parse(req.query.filter),
    active: true,
  };
  // console.log(result1, 'result1.......');
  const result = await User.paginate(result1, JSON.parse(req.query.options)); //.exec()
  // console.log(result.page);
  try {
    if (result) {
      sendResponse(res, httpStatus.OK, result, null);
      // console.log('getting users');
    }
  } catch (error) {
    sendResponse(res, httpStatus.BAD_REQUEST, null, 'cannot getting user');
    console.log(error);
  }
});


const getUser = catchAsync(async (req, res) => {
  const user = await userService.getUserById(req.params.userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  res.send(user);
});
const listUsers = catchAsync(async (req, res) => {

  let options = req.body.options
  let filter = req.body.filter
  var result1 ={}
  if(filter.username) {
    let searchRegex = new RegExp(`.*${filter.username}.*`, "i")
    result1 = {
      username:{ $regex:searchRegex},
      role: 'user',
      active:true

    };
  }
  else{
    result1 = {
      ...filter,
      role: 'user',
      active:true
    };
  } 
  const result = await User.paginate(result1, options); //.exec()
  // console.log(result.page);
  try {
    if (result) {
      sendResponse(res, httpStatus.OK, result, null);
    }
  } catch (error) {
    sendResponse(res, httpStatus.BAD_REQUEST, null, 'cannot getting user');
    console.log(error);
  }
});

// listUsersAdminApi API for backend admin dropdown
const listAllUsers = catchAsync(async (req, res) => {
  const { start, limit, search } = await pick(req.body, ['start', 'limit', 'search']);
  const list = await userService.listAllUsers(start, limit, search);
  if (list) {
    sendResponse(res, httpStatus.OK, list, null);
  } else {
    sendResponse(res, httpStatus.BAD_REQUEST, null, 'No Users');
  }

});

const statususer = catchAsync(async (req, res) => {
  const { status, brandId } = await pick(req.body, ['status', 'brandId']);
  const response = await userService.userstatus(status, brandId);
  if (response) {
    sendResponse(res, httpStatus.OK, response, null);
  } else {
    sendResponse(res, httpStatus.BAD_REQUEST, null, 'Unable to update brand status');
  }
});

const updateUser = catchAsync(async (req, res) => {
  // console.log("params useraid:::", req.params.userId);
  const user = await userService.updateUserById(req.params.userId, req.body);
  if (user) {
    sendResponse(res, httpStatus.OK, user, "User Updated Successfully");
} else {
    sendResponse(res, httpStatus.BAD_REQUEST, null, 'Something went wrong');
}
});

const deleteUser = catchAsync(async (req, res) => {
  const userId = req.params.userId
  const reqbody = req.body
  const removed = await userService.deleteUserById(userId, reqbody);

  if (removed) {
    sendResponse(res, httpStatus.OK, { userId }, "User deleted");
  } else {
    sendResponse(res, httpStatus.BAD_REQUEST, null, 'Not able to delete User');
  }
  // res.status(httpStatus.NO_CONTENT).send();
});

const getUserById = catchAsync(async (userId) => {
  let userObj = await userService.getUserById(userId);
  return userObj;
});

const getMyProfile = catchAsync(async (req, res) => {
  console.log('req.user.id', req.user.id);
  const userId = req.user.id;
  console.log("userId",userId);
  const brandList = await userService.getMyProfileDetail(userId);

  if (brandList) {
    sendResponse(res, httpStatus.OK, brandList, null);
  } else {
    sendResponse(res, httpStatus.BAD_REQUEST, null, 'Something went wrong');
  }
});


const updateMyProfile = catchAsync(async (req, res) => {
  const reqBody = req.body    
  const userId = req.user.id;
  const updateResult = await userService.updateMyProfileDetail(userId, reqBody);

  if (updateResult.nModified) {
    let user = await userService.getUserById(userId)
    sendResponse(res, httpStatus.OK, user, null);
  } else {
    sendResponse(res, httpStatus.BAD_REQUEST, null, 'No data updated');
  }
})

module.exports = {
  createUser,
  getUsers,
  getUser,
  listUsers,
  listAllUsers,
  statususer,
  updateUser,
  deleteUser,
  getUserById,
  getMyProfile,
  updateMyProfile
};
