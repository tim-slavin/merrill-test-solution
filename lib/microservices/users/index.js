'use strict';

const _ = require('lodash');

const Service = require('../service');


const internals = {
  microservice: 'users'
};

exports.get = async function(options, url) { 
  const users = await Service.get(options, internals.microservice, url);
  
  return _.isEmpty(users) ? [] : users;
};
