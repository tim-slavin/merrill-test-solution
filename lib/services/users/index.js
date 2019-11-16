'use strict';

const _ = require('lodash');

const Service = require('../service');


const internals = {
  service: 'users'
};

exports.get = async function(options, url) { 
  const users = await Service.get(options, internals.service, url);
  
  return _.isEmpty(users) ? [] : users;
};
