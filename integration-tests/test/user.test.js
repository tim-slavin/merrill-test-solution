'use strict';


const Service = require('../setup/service');

const Users = require('../../lib/routes/users');


describe('User', () => {
  it('GET /user', async () => {
    const schema = Users.get.response.schema;

    const {payload} = await Service.get('/users');

    await schema.validate(payload);
  });
});
