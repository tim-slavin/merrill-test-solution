'use strict';

const Inert = require('@hapi/inert');
const Vision = require('@hapi/vision');
const HapiSwagger = require('hapi-swagger');

const Env = require('../env');
const SwaggerOptions = require('./swagger');

/* istanbul ignore next */
module.exports = Env === 'jest' ? [] : [
  Inert,
  Vision,
  {
    plugin: HapiSwagger,
    options: SwaggerOptions
  }
];
