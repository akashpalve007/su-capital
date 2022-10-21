const { Brand } = require('../models');
const mongoose = require('mongoose');

const AWS = require('aws-sdk');

// Cloud Configs
const spacesEndpoint = new AWS.Endpoint('sgp1.digitaloceanspaces.com');
const AC_KEY_ID = 'AZNMLUZTUSTIOXVREGIT';
const AC_KEY_SECRET = 'DR9Bq1evIq/Z8mmXRzhzIVvCYRXOAjpSdH8HJrVpbio';
const s3 = new AWS.S3({
  signatureVersion: 'v4',
  endpoint: spacesEndpoint,
  accessKeyId: AC_KEY_ID,
  secretAccessKey: AC_KEY_SECRET,
});

/**
 * Create a User
 * @param {Object} createUserData
 * @returns {Promise<User>}
 */
const addUser = async (createUserData) => {
  console.log("createUserData",createUserData)
  const addResult = await  Brand.create(createUserData);
  return addResult;
};

/**
 * Approve a Brand
 * @param {Object} userid
 * @returns {Promise<User>}
 */
const deleteUser = async (userId) => {
  const updateResult = await Brand.updateOne(
    { _id: userId, active: true },
    { active: false },
    { useFindAndModify: false, new: true }
  );
  return updateResult;
};

/**
 * get brand by brand id
 * @param {Object} userid
 * @returns {Promise<User>}
 */
const getIndividualBrand = async (userId) => {
  const findResult = await Brand.aggregate([
    {
      $match: { _id: mongoose.Types.ObjectId(userId), active: true }
    },
    {
      $lookup:
        {
          from: "users",
          localField: "brandId",
          foreignField: "_id",
          as: "brand"
        }
    }
  ]);
  return findResult;
};

/**
 * update brand
 * @param {Object} username
 * @returns {Promise<User>}
 */
const updateUser = async (reqbody, id) => {
  const updateResult = await Brand.findOneAndUpdate({ active: true, _id: mongoose.Types.ObjectId(id) }, reqbody, {
    new: true,
  });
  return updateResult;
};

module.exports = {
  addUser,
  deleteUser,
  updateUser,
  getIndividualBrand
};
