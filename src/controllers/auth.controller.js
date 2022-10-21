const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { authService, userService, tokenService } = require('../services');
const { sendResponse } = require('../utils/responseHandler');

function randomStringForUsername(length) {
  var result = '';
  var characters = '0123456789';
  var charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

const register = catchAsync(async (req, res) => {
  try {
    const { email, password, username, role, contact } = req.body;
    let roleOfUser = role ? role : 'customer';

    let userObj = {
      email,
      password,
      name: username,
      phoneNumber: contact,
      role: roleOfUser,
    };
    const isEmailAvailable = await userService.isEmailAvailable(req.body.email)
    if (isEmailAvailable) {
      sendResponse(res, httpStatus.BAD_REQUEST, null, 'Email already taken');

    }
    const user = await userService.createUser(userObj);
    const tokens = await tokenService.generateAuthTokens(user);
    res.status(httpStatus.CREATED).send({ user, tokens });
  } catch (error) {
    console.error("Error in registration", error);
  }

});

const adminHost = process.env.adminHost
const login = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  let reqOrigin = req.headers && req.headers.origin ? new URL(req.headers.origin) : ''
  let isAdmin = reqOrigin.host == adminHost
  // console.log("isAdmin::::", isAdmin)
  const user = await authService.loginUserWithEmailAndPassword(email, password, isAdmin);
  const tokens = await tokenService.generateAuthTokens(user);
  res.send({ user, tokens });
});

const adminLogin = catchAsync(async (req, res) => {
  const { email, password } = req.body;
  const user = await authService.adminLoginUserWithEmailAndPassword(email, password);
  const tokens = await tokenService.generateAuthTokens(user);
  res.send({ user, tokens });
});

const getCurrentUser = catchAsync(async (req, res) => {
  try {
    const { token } = req.body;
    console.log("token", token);
    const userData = await authService.getCurrentUser(token);
    if (userData) {
      res.status(httpStatus.OK).json({
        status: httpStatus.OK,
        data: userData,
      });
    } else {
      res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
        status: httpStatus.INTERNAL_SERVER_ERROR,
        data: 'something went wrong',
      });
    }
  } catch (err) {
    res.status(httpStatus.BAD_REQUEST).json({
      status: httpStatus.BAD_REQUEST,
      data: 'Invalid token !',
    });
  }
});

const logout = catchAsync(async (req, res) => {
  await authService.logout(req.body.refreshToken);
  res.status(httpStatus.NO_CONTENT).send();
});

const refreshTokens = catchAsync(async (req, res) => {
  const tokens = await authService.refreshAuth(req.body.refreshToken);
  res.send({ ...tokens });
});

module.exports = {
  register,
  login,
  logout,
  refreshTokens,
  getCurrentUser,
  adminLogin
};
