'use strict';


const Service = require('../service');

const internals = {
  microservice: 'users'
};

exports.get = async function(options, url) { 
  return await Service.get(options, internals.microservice, url);
};
