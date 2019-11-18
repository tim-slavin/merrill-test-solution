'use strict';

const Server = require('../../../lib/server');

const UsersMock = require('../../../lib/services/users');
const UsersFixture = require('../../managers/users/fixtures/result-all-users');
const RegisteredUsersFixture = require('../../../lib/services/users/__mocks__/fixtures/get-registered-users');
const UnregisteredUsersFixture = require('../../../lib/services/users/__mocks__/fixtures/get-unregistered-users');


describe('GET /users', () => {
  let server;

  beforeEach(async () => {
    server = await Server.initialize();
  });

  afterEach(async () => {
    await server.stop();
    jest.clearAllMocks();
  });

  it('successfully retrieves all registered and unregistered users', (async () => {
    UsersMock
        .get
        .mockImplementationOnce(async () => RegisteredUsersFixture)
        .mockImplementationOnce(async () => UnregisteredUsersFixture);

    const res = await server.inject({
      method: 'get',
      url: '/users',
      headers: {
        authorization: 'bearer my-admin-token'
      }
    });

    expect(res.statusCode).toEqual(200);
    expect(res.result).toEqual(UsersFixture);
  }));
});
