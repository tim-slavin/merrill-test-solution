'use strict';

const _ = require('lodash');
const Async = require('async');

const Memberships = require('../memberships');
const {Users} = require('../../services')

const internals = {};

exports.get = async function(options) {
  const getRegisteredUsers = async function() {
    return await internals.get(options, '/registeredusers');
  };

  const getUnregisteredUsers = async function() {
    return await internals.get(options, '/unregisteredusers');
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

internals.get = async function(options, path) {
  const users = await Users.get(options, path);

  return users;
};
