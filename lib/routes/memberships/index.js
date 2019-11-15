'use strict';

const _ = require('lodash');
const Joi = require('@hapi/joi');

const {Memberships} = require('../../managers');

exports.get = {
  description: 'Get list of all project memberships',
  tags: ['api'],
  handler: async function(request, h) {
    const options = {request, context: h.context};

    return await Memberships.get(options);
  }
};
