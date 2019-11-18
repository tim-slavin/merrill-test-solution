'use strict';

const _ = require('lodash');
const Hapi = require('@hapi/hapi');
const HapiWreck = require('@hapi/wreck');

const Context = require('./context');
const Plugins = require('./plugins');
const Routes = require('../routes');

const internals = {};

/* istanbul ignore next */
exports.start = async function(requestedContext) {
  const context = _.isEmpty(requestedContext) ? Context: requestedContext;

  const server = await internals.hapi(context);
  server.decorate('request', 'wreck', internals.decorateRequest, {apply: true});
  await server.start();

  // eslint-disable-next-line no-console
  console.log('Server running on %s', server.info.uri);
  // eslint-disable-next-line no-console
  console.log('Documentation at:', `${server.info.uri }/documentation`);

  return server;
};

exports.initialize = async function() {
  const server = await internals.hapi(Context);
  await server.initialize();

  return server;
};

internals.hapi = async function(context) {
  const server = Hapi.server({
    port: process.env.PORT || 8080,
    router: {isCaseSensitive: false},
    routes: {
      validate: {
        failAction: (request, h, err) => {
          throw err;
        }
      }
    }
  });

  server.bind(context);

  await server.register(Plugins);

  // const useRouteVersioning = _.get(Services[Env], 'useRouteVersioning', false);

  // /* istanbul ignore next */
  // if (useRouteVersioning) {
  //   server.realm.modifiers.route.prefix = `/v${_.head(Package.version)}`;
  // }

  server.route(Routes);

  return server;
};

internals.decorateRequest = function(request) {
  const wreck = HapiWreck.defaults({
    headers: {
      'correlation-id': request.headers['correlation-id'] || request.info.id
    },
    rejectUnauthorized: false,
    json: true,
    events: true
  });

  return wreck;
};


/* istanbul ignore next */
process.on('unhandledRejection', (err) => {
  // eslint-disable-next-line no-console
  console.log(err);
  // process.exit(1);
});
