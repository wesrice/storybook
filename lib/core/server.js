const defaultWebpackConfig = require('./dist/server/config/webpack.config.default.js');
const serverUtils = require('./dist/server/utils');
const buildStatic = require('./dist/server/build-static');
const buildDev = require('./dist/server/build-dev');
const mergeConfigs = require('./dist/server/mergeConfigs');

module.exports = Object.assign(
  { defaultWebpackConfig, mergeConfigs },
  buildStatic,
  buildDev,
  serverUtils
);
