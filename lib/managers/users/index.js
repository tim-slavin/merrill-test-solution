'use strict';


const {Users} = require('../../microservices');

const internals = {};

exports.getRegistered = async function(options) {
  return await internals.get(options, '/registeredusers');
};

exports.getUnregistered = async function(options) {
  return await internals.get(options, '/unregisteredusers');
};

internals.get = async function(options, path) {
  const users = await Users.get(options, path);

  return users;
};
