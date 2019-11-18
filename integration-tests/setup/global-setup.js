'use strict';

const _ = require('lodash');

const ApiServer = require('../../lib/server');
const StagingContext = require('./environment/staging-context');
const ProdContext = require('./environment/production-context');

const internals = {};


module.exports = async function() {
  // eslint-disable-next-line no-console
  console.log(`${process.env.INTEGRATION_ENV}\n`);

  if (process.env.INTEGRATION_ENV === 'local') {
    return await internals.startServer();
  }

  if (_.startsWith(process.env.INTEGRATION_ENV, 'local-')) {
    const envs = _.split(process.env.INTEGRATION_ENV, '-');

    if (_.isEqual('stage', envs[1])) {
      return await internals.startServer(StagingContext);
    }

    if (_.isEqual('production', envs[1])) {
      return await internals.startServer(ProdContext);
    }
  }

  return {};
};

internals.startServer = async function(context) {
  const startServer = async function() {
    const server = await ApiServer.start(context);
    global.API_SERVER = server;

    return await server.start();
  };

  if (process.env.INTEGRATION_ENV === 'local') {
    return await startServer();
  }

  if (_.startsWith(process.env.INTEGRATION_ENV, 'local-')) {
    const envs = _.split(process.env.INTEGRATION_ENV, '-');

    if (_.isEqual('stage', envs[1])) {
      return await startServer(StagingContext);
    }

    if (_.isEqual('production', envs[1])) {
      return await startServer(ProdContext);
    }
  }

  return {};
};
