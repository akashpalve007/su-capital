const httpStatus = require('http-status');
const tokenService = require('./token.service');
const userService = require('./user.service');
const Token = require('../models/token.model');
const User = require('../models/user.model');
const ApiError = require('../utils/ApiError');
const { tokenTypes } = require('../config/tokens');
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const { adminRoles } = require('../config/roles');

/**
 * Login with username and password
 * @param {string} email
 * @param {string} password
 * @returns {Promise<User>}
 */
const loginUserWithEmailAndPassword = async (email, password, isAdmin) => {
  const user = await userService.getUserByEmail(email);
  if (user && !(user.role == 'customer')) throw new ApiError(httpStatus.UNAUTHORIZED, 'User is not authorized');
  if (!user || !(await user.isPasswordMatch(password))) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Incorrect email or password');
  }
  return user;
};

/**
 * Login with username and password
 * @param {string} email
 * @param {string} password
 * @returns {Promise<User>}
 */
const adminLoginUserWithEmailAndPassword = async (email, password) => {
  const user = await userService.getUserByEmail(email);
  if (!user || !(await user.isPasswordMatch(password))) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Incorrect email or password');
  }
  if (user && !adminRoles.includes(user.role)) throw new ApiError(httpStatus.UNAUTHORIZED, 'User is not authorized');
  return user;
};

/**
 * Logout
 * @param {string} refreshToken
 * @returns {Promise}
 */
const logout = async (refreshToken) => {
  const refreshTokenDoc = await Token.findOne({ token: refreshToken, type: tokenTypes.REFRESH, blacklisted: false });
  if (!refreshTokenDoc) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Not found');
  }
  await refreshTokenDoc.remove();
};



/**
 * Refresh auth tokens
 * @param {string} refreshToken
 * @returns {Promise<Object>}
 */
const refreshAuth = async (refreshToken) => {
  try {
    const refreshTokenDoc = await tokenService.verifyToken(refreshToken, tokenTypes.REFRESH);
    const user = await userService.getUserById(refreshTokenDoc.user);
    if (!user) {
      throw new Error();
    }
    await refreshTokenDoc.remove();
    return tokenService.generateAuthTokens(user);
  } catch (error) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Please authenticate');
  }
};


/**
 * getCurrentUser
 * @param {string} username
 * @returns {Promise}
 */
 const getCurrentUser = async (token) => {
  try {
    const { user } = await tokenService.verifyToken(token, 'refresh');
    const userData = await User.findOne({ _id: mongoose.Types.ObjectId(user), active: true });
    return userData;
  } catch (error) {
    throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, 'getCurrentUser failed');
  }
};




module.exports = {
  loginUserWithEmailAndPassword,
  logout,
  refreshAuth,
  adminLoginUserWithEmailAndPassword,
  getCurrentUser
};
