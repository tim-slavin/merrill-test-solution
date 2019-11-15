'use strict';

const Users = require('./users');

module.exports = [
  {
    path: '/users/registered',
    method: 'GET',
    config: Users.getRegistered
  },
  {
    path: '/users/unregistered',
    method: 'GET',
    config: Users.getUnregistered
  }
];
