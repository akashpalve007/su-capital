const express = require('express');
const config = require('../../config/config');
const authRoute = require('./auth.route');
const userRoute = require('./user.route');
const docsRoute = require('./docs.route');
const nftUserRoute = require('./nftUsers.route');
const collectionsRoute = require('../v1/collections.route')
const seriesRoute = require('../../routes/v1/series.route')
const collectibleRoute = require("./collectible.route")
const comicRoute = require('./comic.route')
const dropRoute = require('./drops.route')
const whiteListRoute = require('./whitelist.route')
const editions = require('./editions.route')

const { uploadFile } = require('../../utils/fileUpload');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/auth',
    route: authRoute,
  },
  {
    path: '/router',
    route: authRoute,
  },
  {
    path: '/users',
    route: userRoute,
  },
  {
    path: '/nftuser',
    route: nftUserRoute,
  },
  // collection route
  {
    path: '/collection',
    route: collectionsRoute,
  },
  // series route 
  {
    path: '/series',
    route: seriesRoute,
  },
  //collectible route
  {
    path: '/collectible',
    route: collectibleRoute,
  },
  //comic route
  {
    path: '/comic',
    route: comicRoute,
  },
  //drop route
  {
    path: '/drops',
    route: dropRoute,
  },
  //whitelist route
  {
    path: '/whitelists',
    route: whiteListRoute,
  },
  {
    path: '/editions',
    route: editions,
  },
];

const devRoutes = [
  // routes available only in development mode
  {
    path: '/docs',
    route: docsRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

router.route('/upload-file').post(uploadFile);


/* istanbul ignore next */
if (config.env === 'development') {
  devRoutes.forEach((route) => {
    router.use(route.path, route.route);
  });
}

module.exports = router;
