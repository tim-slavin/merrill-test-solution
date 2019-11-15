'use strict';

const _ = require('lodash');
const Joi = require('@hapi/joi');

const {Users} = require('../../managers');

exports.getRegistered = {
  description: 'Get list of all registered users',
  tags: ['api'],
  handler: async function(request, h) {
    const options = {request, context: h.context};

    return await Users.getRegistered(options);
  }
};

exports.getUnregistered = {
  description: 'Get list of all unregistered users',
  tags: ['api'],
  handler: async function(request, h) {
    const options = {request, context: h.context};

    return await Users.getUnregistered(options);
  }
};