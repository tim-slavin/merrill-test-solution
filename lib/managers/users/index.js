'use strict';

const _ = require('lodash');
const Async = require('async');

const Memberships = require('../memberships');
const {Users} = require('../../microservices')

const internals = {};

exports.get = async function(options) {
  const getRegisteredUsers = async function() {
    return await internals.getRegistered(options);
  };

  const getUnregisteredUsers = async function() {
    return await internals.getUnregistered(options);
  };

  const getMemberships = async function() {
    return await Memberships.get(options);
  };

  const buildPayload = async function({registered, unRegistered, memberships}) {
    const assignProjects = function(user) {
      const userMemberships = _.filter(memberships, (membership) => membership.userId === user.id);

      return _.assign(user, {projectIds: _.map(userMemberships, 'projectId')});
    };

    return _.chain(registered)
      .concat(unRegistered)
      .uniqBy('id')
      .map(assignProjects)
      .value();
  };

  const {payload} = await Async.auto({
    registered: getRegisteredUsers,
    unRegistered: getUnregisteredUsers,
    memberships: getMemberships,
    payload: ['registered', 'unRegistered', 'memberships', buildPayload]
  });

  return payload;
};

exports.getRegistered = internals.getRegistered = async function(options) {
  return await internals.get(options, '/registeredusers');
};

exports.getUnregistered = internals.getUnregistered = async function(options) {
  return await internals.get(options, '/unregisteredusers');
};

internals.get = async function(options, path) {
  const users = await Users.get(options, path);

  return users;
};
