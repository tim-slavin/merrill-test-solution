'use strict';


const _ = require('lodash');

const Service = require('../service');

const internals = {
  microservice: 'memberships'
};

exports.get = async function(options, url) { 
  const memberships = await Service.get(options, internals.microservice, url);

  return _.isEmpty(memberships) ? [] : memberships;
};