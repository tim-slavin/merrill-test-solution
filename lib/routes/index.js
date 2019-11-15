'use strict';

const Users = require('./users');
const Memberships = require('./memberships');

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
  },
  {
    path: '/memberships',
    method: 'GET',
    config: Memberships.get
  }
];
