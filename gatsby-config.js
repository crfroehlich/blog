'use strict';

require('source-map-support').install();
require('ts-node').register();

const config = require('./build/gatsby/gatsby-config.ts');
config.gatsbyConfig.flags = { 
  FAST_REFRESH: true,
  LAZY_IMAGES: true,
  PARALLEL_SOURCING: true, 
  PRESERVE_FILE_DOWNLOAD_CACHE: true,
  PRESERVE_WEBPACK_CACHE: true,
  QUERY_ON_DEMAND: true,
};
module.exports = config;