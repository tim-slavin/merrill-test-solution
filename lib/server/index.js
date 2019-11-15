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

  // const userCustomerAuth = Authorization.Strategy.userCustomer(context);

  // server.auth.scheme('anonymous-or-bearer-access-token', Authorization.Scheme.anonymousOrBearerAccessToken);

  // server.auth.strategy('anonymousOrUserAuth', 'anonymous-or-bearer-access-token', {
  //   validateUserFunc: userCustomerAuth,
  //   validateAnonymousFunc: Authorization.Strategy.anonymous(context)
  // });

  // const userStoreAuth = Authorization.Strategy.userStore(context);
  // const userCartAuth = Authorization.Strategy.userCart(context);

  // const adminStoreAuth = Authorization.Strategy.adminStore(context);
  // const adminAuth = Authorization.Strategy.admin(context);
  // const groupAdminAuth = Authorization.Strategy.groupAdmin(context);
  // const workflowAdminAuth = Authorization.Strategy.workflowAdmin(context);
  // const categoryAdminAuth = Authorization.Strategy.categoryAdmin(context);
  // const userAdminAuth = Authorization.Strategy.userAdmin(context);

  // server.auth.strategy('userAuth', 'bearer-access-token', {validate: userCustomerAuth});
  // server.auth.strategy('userCustomerAuth', 'bearer-access-token', {validate: userCustomerAuth});
  // server.auth.strategy('userStoreAuth', 'bearer-access-token', {validate: userStoreAuth});
  // server.auth.strategy('userCartAuth', 'bearer-access-token', {validate: userCartAuth});

  // server.auth.strategy('adminStoreAuth', 'bearer-access-token', {validate: adminStoreAuth});
  // server.auth.strategy('adminAuth', 'bearer-access-token', {validate: adminAuth});
  // server.auth.strategy('groupAdminAuth', 'bearer-access-token', {validate: groupAdminAuth});
  // server.auth.strategy('workflowAdminAuth', 'bearer-access-token', {validate: workflowAdminAuth});
  // server.auth.strategy('categoryAdminAuth', 'bearer-access-token', {validate: categoryAdminAuth});
  // server.auth.strategy('userAdminAuth', 'bearer-access-token', {validate: userAdminAuth});

  // server.auth.strategy('anonymousOrUserCartAuth', 'anonymous-or-bearer-access-token', {
  //   validateUserFunc: Authorization.Strategy.userCart(context),
  //   validateAnonymousFunc: Authorization.Strategy.anonymousCart(context)
  // });

  // server.auth.strategy('anonymousOrUserStoreAuth', 'anonymous-or-bearer-access-token', {
  //   validateUserFunc: Authorization.Strategy.userStore(context),
  //   validateAnonymousFunc: Authorization.Strategy.anonymousStore(context)
  // });

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
