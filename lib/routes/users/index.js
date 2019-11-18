'use strict';

const Joi = require('@hapi/joi');

const {Users} = require('../../managers');


exports.get = {
  description: 'Get list of all users',
  tags: ['api'],
  handler: async function(request, h) {
    const options = {request, context: h.context};

    return await Users.get(options);
  },
  response: {
    schema: Joi.array().items(Joi.object().keys({
      id: Joi.string().required(),
      emailAddress: Joi.string().email().required(),
      languageCode: Joi.string().required(),
      firstName: Joi.string(),
      lastName: Joi.string(),
      company: Joi.string(),
      organizationType: Joi.string(),
      city: Joi.string(),
      state: Joi.string(),
      zipCode: Joi.string(),
      country: Joi.string(),
      phone: Joi.string(),
      disclaimerAccepted: Joi.boolean(),
      projectIds: Joi.array().items(Joi.string()),
      registrationId: Joi.string(),
      registrationIdGeneratedTime: Joi.string()
    })
        .and('registrationId', 'registrationIdGeneratedTime')
        .and('firstName', 'lastName', 'company', 'organizationType', 'city', 'state',
            'zipCode', 'country', 'phone', 'disclaimerAccepted')
        .without('registrationId', ['firstName', 'lastName', 'company', 'organizationType',
          'city', 'state', 'zipCode', 'country', 'phone', 'disclaimerAccepted'])
    ),
    failAction: 'ignore'
  }
};
