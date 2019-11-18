'use strict';

const _ = require('lodash');
const Config = require('./environment.config');

const internals = {};

internals.init = function() {
  if (_.startsWith(process.env.INTEGRATION_ENV, 'local-')) {
    const envs = _.split(process.env.INTEGRATION_ENV, '-');
    const localConfig = Config[envs[0]];
    const envConfig = Config[envs[1]];

    envConfig.api.url = localConfig.api.url;

    return envConfig;
  }

  return Config[process.env.INTEGRATION_ENV];
};

module.exports = internals.init();
