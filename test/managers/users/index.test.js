'use strict';

const {Users} = require('../../../lib/managers');
const UsersMock = require('../../../lib/services/users');

const UsersFixture = require('./fixtures/result-all-users');
const RegisteredUsersFixture =
      require('../../../lib/services/users/__mocks__/fixtures/get-registered-users');
const UnregisteredUsersFixture =
      require('../../../lib/services/users/__mocks__/fixtures/get-unregistered-users');

describe('Users', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('get', () => {
    it('successfully gets all the users', async () => {
      UsersMock
          .get
          .mockImplementationOnce(async () => RegisteredUsersFixture)
          .mockImplementationOnce(async () => UnregisteredUsersFixture);

      const users = await Users.get({});
      expect(users).toEqual(UsersFixture);
    });
  });
});
