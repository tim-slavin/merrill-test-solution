'use strict';

const GetMembershipsFixture = require('./fixtures/get-memberships');


exports.get = jest.fn(() => Promise.resolve(GetMembershipsFixture));
