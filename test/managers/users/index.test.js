'use strict';

const Boom = require('@hapi/boom');

const {Users} = require('../../../lib/managers');
const UsersMock = require('../../../lib/services/users');
const MembershipsMock = require('../../../lib/services/memberships');

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
    describe('happy path - proper response generated', () => {
      it('when \'registered\' and \'unregistered\' users exist', async () => {
        UsersMock
            .get
            .mockImplementationOnce(async () => RegisteredUsersFixture)
            .mockImplementationOnce(async () => UnregisteredUsersFixture);

        const users = await Users.get({});
        expect(users).toEqual(UsersFixture);
      });

      it('should only \'registered\' users exist', async () => {
        UsersMock
            .get
            .mockImplementationOnce(async () => RegisteredUsersFixture)
            .mockImplementationOnce(async () => []);

        const users = await Users.get({});
        expect(users).toEqual([
          {
            id: '1',
            city: 'Jaydashire',
            company: 'Goyette - Renner',
            country: 'South Africa',
            firstName: 'firstName 1',
            lastName: 'lastName 1',
            organizationType: 'organizationType 1',
            phone: '524.276.1570 x487',
            state: 'SD',
            zipCode: '68048',
            disclaimerAccepted: false,
            languageCode: 'en',
            emailAddress: 'last1@mail.com',
            projectIds: ['1', '2', '3']
          },
          {
            id: '2',
            city: 'Adolfofort',
            company: 'Fisher - Bartoletti',
            country: 'China',
            firstName: 'firstName 2',
            lastName: 'lastName 2',
            organizationType: 'organizationType 2',
            phone: '(308) 197-9774 x339',
            state: 'CO',
            zipCode: '78569',
            disclaimerAccepted: true,
            languageCode: 'en',
            emailAddress: 'last2@mail.com',
            projectIds: []
          }
        ]);
      });

      it('should only \'unregistered\' users exist', async () => {
        UsersMock
            .get
            .mockImplementationOnce(async () => [])
            .mockImplementationOnce(async () => UnregisteredUsersFixture);

        const users = await Users.get({});
        expect(users).toEqual([
          {
            id: '3',
            emailAddress: 'email1@somewhere.com',
            languageCode: 'en',
            registrationId: 'jwsMJNOk3oM3hVM5bGcF1',
            registrationIdGeneratedTime: '156165026851',
            projectIds: ['4']
          },
          {
            id: '4',
            emailAddress: 'email2@somewhere.com',
            languageCode: 'en',
            registrationId: 'jwsMJNOk3oM3hVM5bGcF2',
            registrationIdGeneratedTime: '156165026852',
            projectIds: []
          }
        ]);
      });

      it('should no memberships exist', async () => {
        MembershipsMock.get.mockImplementationOnce(async () => []);

        const users = await Users.get({});
        expect(users).toEqual([
          {
            id: '1',
            city: 'Jaydashire',
            company: 'Goyette - Renner',
            country: 'South Africa',
            firstName: 'firstName 1',
            lastName: 'lastName 1',
            organizationType: 'organizationType 1',
            phone: '524.276.1570 x487',
            state: 'SD',
            zipCode: '68048',
            disclaimerAccepted: false,
            languageCode: 'en',
            emailAddress: 'last1@mail.com',
            projectIds: []
          },
          {
            id: '2',
            city: 'Adolfofort',
            company: 'Fisher - Bartoletti',
            country: 'China',
            firstName: 'firstName 2',
            lastName: 'lastName 2',
            organizationType: 'organizationType 2',
            phone: '(308) 197-9774 x339',
            state: 'CO',
            zipCode: '78569',
            disclaimerAccepted: true,
            languageCode: 'en',
            emailAddress: 'last2@mail.com',
            projectIds: []
          }
        ]);
      });
    });

    describe('errors', () => {
      it('handles downstream error while retrieving user details', async () => {
        UsersMock.get.mockImplementationOnce(async () => {
          throw Boom.badImplementation('Something horrible happened');
        });

        await expect(Users.get({}))
            .rejects.toThrow('Something horrible happened');
      });

      it('handles downstream error while retrieving membership details', async () => {
        MembershipsMock.get.mockImplementationOnce(async () => {
          throw Boom.badImplementation('Something horrible happened');
        });

        await expect(Users.get({}))
            .rejects.toThrow('Something horrible happened');
      });
    });
  });
});
