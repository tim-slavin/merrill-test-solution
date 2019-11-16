'use strict';

const Users = require('./users');

module.exports = [
  {
    path: '/users',
    method: 'GET',
    config: Users.get
  }
];
