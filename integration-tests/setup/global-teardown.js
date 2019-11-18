'use strict';

const _ = require('lodash');


module.exports = async function() {
  if (_.startsWith(process.env.INTEGRATION_ENV, 'local')) {
    await global.API_SERVER.stop();
  }
};
