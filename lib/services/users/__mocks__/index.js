'use strict';

const GetUsersFixture = require('./fixtures/get-registered-users');


exports.get = jest.fn(() => Promise.resolve(GetUsersFixture));
