'use strict';

const Service = require('../../lib/services/service');

describe('Service calls', () => {
  const getMockImplementation = jest.fn().mockImplementation(async () =>{
    return {
      payload: {}
    };
  });

  const postMockImplementation = jest.fn().mockImplementation(async () =>{
    return {
      payload: {}
    };
  });

  const putMockImplementation = jest.fn().mockImplementation(async () =>{
    return {
      payload: {}
    };
  });

  const patchMockImplementation = jest.fn().mockImplementation(async () =>{
    return {
      payload: {}
    };
  });

  const deleteMockImplementation = jest.fn().mockImplementation(async () =>{
    return {
      payload: {}
    };
  });

  const mockWreck = {
    get: getMockImplementation,
    post: postMockImplementation,
    put: putMockImplementation,
    patch: patchMockImplementation,
    delete: deleteMockImplementation
  };

  const options = {
    context: {
      memberships: {
        url: 'https://myserver.me'
      },
      users: {
        url: 'https://myserver.me'
      }
    },
    request: {
      wreck: mockWreck,
      headers: {
        'correlation-id': 'my-correlation-id'
      },
      auth: {
        credentials: {
          customerId: 'my-customer-id'
        }
      }
    }
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('sends correlation-id', () => {
    const options = {
      context: {
        memberships: {
          url: 'https://myserver.me'
        },
        users: {
          url: 'https://myserver.me'
        }
      },
      request: {
        wreck: mockWreck,
        headers: {},
        info: {
          id: 'my-request-id'
        },
        auth: {
          credentials: {
            customerId: 'my-customer-id'
          }
        }
      }
    };

    it('GET calls uses the correct headers', async () => {
      await Service.get(options, 'users', '/somepath');

      expect(getMockImplementation.mock.calls[0][0]).toEqual('https://myserver.me/somepath');
      expect(getMockImplementation.mock.calls[0][1]).toEqual({
        headers: {
          'correlation-id': 'my-request-id',
          'accept': 'application/json; charset=utf-8'
        }
      });
    });

    it('POST calls uses the correct headers', async () => {
      const payload = {
        a: 1
      };

      await Service.post(options, 'users', '/somepath', payload);

      expect(postMockImplementation.mock.calls[0][0]).toEqual('https://myserver.me/somepath');
      expect(postMockImplementation.mock.calls[0][1]).toEqual({
        headers: {
          'correlation-id': 'my-request-id',
          'accept': 'application/json; charset=utf-8'
        },
        payload
      });
    });

    it('PATCH calls uses the correct headers', async () => {
      const payload = {
        a: 1
      };

      await Service.patch(options, 'users', '/somepath', payload);

      expect(patchMockImplementation.mock.calls[0][0]).toEqual('https://myserver.me/somepath');
      expect(patchMockImplementation.mock.calls[0][1]).toEqual({
        headers: {
          'correlation-id': 'my-request-id',
          'accept': 'application/json; charset=utf-8'
        },
        payload
      });
    });

    it('PUT calls uses the correct headers', async () => {
      const payload = {
        a: 1
      };

      await Service.put(options, 'users', '/somepath', payload);

      expect(putMockImplementation.mock.calls[0][0]).toEqual('https://myserver.me/somepath');
      expect(putMockImplementation.mock.calls[0][1]).toEqual({
        headers: {
          'correlation-id': 'my-request-id',
          'accept': 'application/json; charset=utf-8'
        },
        payload
      });
    });

    it('DELETE calls uses the correct headers', async () => {
      await Service.delete(options, 'users', '/somepath');

      expect(deleteMockImplementation.mock.calls[0][0]).toEqual('https://myserver.me/somepath');
      expect(deleteMockImplementation.mock.calls[0][1]).toEqual({
        headers: {
          'correlation-id': 'my-request-id',
          'accept': 'application/json; charset=utf-8'
        }
      });
    });
  });

  describe('uses request id when correlation-id is not provided', () => {
    it('GET calls uses the correct headers', async () => {
      await Service.get(options, 'users', '/somepath');

      expect(getMockImplementation.mock.calls[0][0]).toEqual('https://myserver.me/somepath');
      expect(getMockImplementation.mock.calls[0][1]).toEqual({
        headers: {
          'correlation-id': 'my-correlation-id',
          'accept': 'application/json; charset=utf-8'
        }
      });
    });

    it('POST calls uses the correct headers', async () => {
      const payload = {
        a: 1
      };

      await Service.post(options, 'users', '/somepath', payload);

      expect(postMockImplementation.mock.calls[0][0]).toEqual('https://myserver.me/somepath');
      expect(postMockImplementation.mock.calls[0][1]).toEqual({
        headers: {
          'correlation-id': 'my-correlation-id',
          'accept': 'application/json; charset=utf-8'
        },
        payload
      });
    });

    it('PATCH calls uses the correct headers', async () => {
      const payload = {
        a: 1
      };

      await Service.patch(options, 'users', '/somepath', payload);

      expect(patchMockImplementation.mock.calls[0][0]).toEqual('https://myserver.me/somepath');
      expect(patchMockImplementation.mock.calls[0][1]).toEqual({
        headers: {
          'correlation-id': 'my-correlation-id',
          'accept': 'application/json; charset=utf-8'
        },
        payload
      });
    });

    it('PUT calls uses the correct headers', async () => {
      const payload = {
        a: 1
      };

      await Service.put(options, 'users', '/somepath', payload);

      expect(putMockImplementation.mock.calls[0][0]).toEqual('https://myserver.me/somepath');
      expect(putMockImplementation.mock.calls[0][1]).toEqual({
        headers: {
          'correlation-id': 'my-correlation-id',
          'accept': 'application/json; charset=utf-8'
        },
        payload
      });
    });

    it('DELETE calls uses the correct headers', async () => {
      await Service.delete(options, 'users', '/somepath');

      expect(deleteMockImplementation.mock.calls[0][0]).toEqual('https://myserver.me/somepath');
      expect(deleteMockImplementation.mock.calls[0][1]).toEqual({
        headers: {
          'correlation-id': 'my-correlation-id',
          'accept': 'application/json; charset=utf-8'
        }
      });
    });
  });
});
