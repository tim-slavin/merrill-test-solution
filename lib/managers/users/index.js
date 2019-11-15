'use strict';

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

  const getMembershps = async function() {
    return await Memberships.get(options);
  };

  const buildPayload = function({registered, unRegistered, memberships}) {
    return {};
  };

  const {payload} = await Async.auto({
    registered: getRegisteredUsers,
    unRegistered: getUnregisteredUsers,
    memberships: getMembershps,
    payload: ['registered', 'unregistered', 'memberships', buildPayload]
  });
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
