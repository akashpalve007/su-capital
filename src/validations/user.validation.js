const Joi = require('joi');
const { password, objectId } = require('./custom.validation');

const createUser = {
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    username: Joi.string().required(),
    password: Joi.string().required().custom(password),
    fName: Joi.string().required(),
    lName: Joi.string().required(),
    role: Joi.string().required().valid('writer', 'admin','user'),
    profilePic: Joi.string().allow(""),
    phoneNumber:Joi.string().allow(""),
    country:Joi.string().allow(""),
    bio:Joi.string().allow(""),
    
  }),
};
const listUsers = {
  body: Joi.object().keys({
    filter: Joi.object().required(),
    options: Joi.object().required(),
  }),
};

const getUsers = {
  query: Joi.object().keys({
    name: Joi.string(),
    role: Joi.string(),
    sortBy: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};


const statusUser = {
  body: Joi.object().keys({
    status: Joi.string().required(),
    brandId: Joi.custom(objectId).required(),
  }),
};

const getUser = {
  params: Joi.object().keys({
    userId: Joi.string().custom(objectId),
  }),
};

const updateUser = {
  params: Joi.object().keys({
    userId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
     email: Joi.string().required().email(),
    username: Joi.string().required(),
    password: Joi.string().required().custom(password),
    fName: Joi.string().required(),
    lName: Joi.string().required(),
    role: Joi.string().required().valid('writer', 'admin','user',),
    profilePic: Joi.string().allow(""),
    phoneNumber:Joi.string().allow(""),
    country:Joi.string().allow(""),
    bio:Joi.string().allow(""),
    })
    .min(1),
};

const deleteUser = {
  params: Joi.object().keys({
    userId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createUser,
  listUsers,
  statusUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
};
